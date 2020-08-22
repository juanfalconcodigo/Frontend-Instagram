import React, { useState, useEffect } from 'react';
import {Search as SearchSU, Image} from 'semantic-ui-react';
import { debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';
import {  Subject } from 'rxjs';
import { SEARCH } from '../../../gql/user';
import { useQuery } from '@apollo/client';
import imageNotFound from '../../../assets/images/avatar.png'
import './Search.scss';
import { Link } from 'react-router-dom';




export default function Search() {
    const [search,setSearch]=useState(null);
    const [debouncedName, setDebouncedName] = useState(null);
    const [onSearch$] = useState(()=>new Subject());
    const {data,loading}=useQuery(SEARCH,{
        variables:{
            search:debouncedName
        }
    });

    const[results,setResults]=useState([]);


    useEffect(() => {
        const subscription = onSearch$.pipe(
          debounceTime(400),
          distinctUntilChanged(),
          tap(a => console.log('tap',a))
        ).subscribe((resp)=>{
            setDebouncedName(resp);
        });

        if(data?.search.length>0){
            const users=[];
            data.search.forEach((e,i)=>{
                users.push({
                    key:i,
                    title:e.name,
                    username:e.username,
                    avatar:e.avatar
                });
            });
            setResults(users)
        }else{
            setResults([])
        }

        return ()=>{
            subscription.unsubscribe();
        }
      }, [data])


    const handleSearch = e => {
        if(e.target.value){
            setSearch(e.target.value);
            onSearch$.next(e.target.value)
        }else{
            onSearch$.next(null);
            setSearch(null);
        }
      };
    
      const handleResultSelect=()=>{
        setSearch(null);
        onSearch$.next(null);
        setResults([]);
      }
    return (
       <>
        <SearchSU results={results} resultRenderer={(e,i)=>(<ResultSearch data={e} key={i}/>)} 
        value={search || ""} loading={loading} fluid input={{icon:'search',iconPosition:'left'}}
         className="search-users" onSearchChange={handleSearch} onResultSelect={handleResultSelect}/>
        {/* <p>Debounced: {debouncedName}</p> */}
      </>
    )
}



function ResultSearch({data}){
    
    return (
      <Link to={`/${data.username}`} className="search-users__item">
          <Image src={data.avatar||imageNotFound}/>
          <div>
               <p>{data.title}</p>
               <p>{data.username}</p>
          </div>
      </Link>
    )

}
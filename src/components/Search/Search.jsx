import React from 'react'
import { FaSearch } from "react-icons/fa";
import { setSearch } from "../../states/slices/searchSlice";
import { useDispatch } from 'react-redux';

function Search() {
  const dispatch = useDispatch();

  function goSearch(input) {
    dispatch(setSearch(input.toLowerCase()));
  }

  return (
    <div className='flex items-center'>
      <input className="w-3/4 p-2 border border-gray-300 rounded mb-2 ms-12 outline-none" type="text" placeholder="Search here..." onChange={(e) => goSearch(e.target.value)} />
      <span className='relative right-10 rounded-r bottom-1 bg-gray-300 p-3 border border-gray-300'><FaSearch /></span>
    </div>
  )
}

export default Search
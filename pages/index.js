// pages/index.js
import React from 'react';
import Link from 'next/link';
import AddSchool from './addSchool'

import ShowSchool from './showSchool';
const AddSchool = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
      
      <Link href="/addSchool">
        { AddSchool}
        </Link>

        <Link href="/showSchool">
        { ShowSchool}
        </Link>
      </nav>
    </div>
  );
};

export default AddSchool;

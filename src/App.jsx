import React from 'react'
import { Routes , Route } from 'react-router-dom'
import { NewEmployee } from "./pages/NewEmployee.jsx"
import { EmployeeList } from "./pages/EmployeeList.jsx"
import { AboutEmployee } from "./pages/AboutEmployee.jsx"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NewEmployee />} />
        <Route path="/employee" element={<EmployeeList />} />
        <Route path="/employee/:id" element={<AboutEmployee />} />
      </Routes>
    </div>
  )
}

export default App

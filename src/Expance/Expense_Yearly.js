// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Ex_Yearly() {
//   const [selectedYear, setSelectedYear] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [expenseData, setExpenseData] = useState([]);
//   const [totalExpenses, setTotalExpenses] = useState(0);

//   const handleYearChange = (event) => {
//     setSelectedYear(event.target.value);
//   };

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       if (selectedYear !== '') {
//         try {
//           const startOfYear = `${selectedYear}-01-01`;
//           const endOfYear = `${selectedYear}-12-31`;

//           let url = 'http://localhost:8080/api/expenses/getDataBetweenDates';
//           if (selectedCategory !== '') {
//             url = `http://localhost:8080/api/expenses/getDataBetweenDates?startDate=${startOfYear}&endDate=${endOfYear}&expenseType=${selectedCategory}`;
//           }

//           const response = await axios.get(url);

//           setExpenseData(response.data);
//           const total = response.data.reduce((acc, item) => acc + Number(item.grandTotal), 0);
//           setTotalExpenses(total);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       }
//     };

//     fetchData();
//   }, [selectedYear, selectedCategory]);

//   return (
//     <div className='flex flex-col h-screen'>
//       <div className="max-w-xl mx-auto p-4 bg-white shadow-md ml-0">
//         <h1 className="text-xl font-semibold mb-4">Select Year</h1>
//         <div className="flex items-center mb-4">
//           <input type="number" value={selectedYear} onChange={handleYearChange} className="rounded-l-md border border-gray-300 focus:outline-none px-3 py-2 w-60" placeholder="Enter year" />
//           <div>
//           <select value={selectedCategory} onChange={handleCategoryChange} className="rounded-l-md border border-gray-300 focus:outline-none px-3 py-2">
//             <option value="">Select Category</option>
//             <option value="employee">Employee</option>
//             <option value="Routine">Routine</option>
//             <option value="capital">Capital</option>
//             <option value="Rawmaterial">Raw Material</option>
//           </select>
//         </div>
//         </div>
        
//       </div>

//       <div className='max-w-4xl mt-8 bg-white shadow-md rounded-md justify-center items-center overflow-x-auto'>
//         <h2 className="text-xl font-semibold p-4">Expense Data</h2>
//         <table className="w-full table-auto">
//           <thead>
//             <tr>
//               <th className="sticky top-0 px-4 py-2 bg-gray-100">ID</th>
//               <th className="sticky top-0 px-4 py-2 bg-gray-100">Date</th>
//               <th className="sticky top-0 px-4 py-2 bg-gray-100">Expense</th>
//             </tr>
//           </thead>
//           <tbody>
//             {expenseData.map((expense) => (
//               <tr key={expense.id}>
//                 <td className="border px-4 py-2 text-center">{expense.id}</td>
//                 <td className="border px-4 py-2 text-center">{expense.date}</td>
//                 <td className="border px-4 py-2 text-center">{expense.grandTotal}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <p className="p-4">Total Expenses: {totalExpenses}</p>
//       </div>
//     </div>
//   );
// }

// export default Ex_Yearly;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Ex_Yearly() {
  const currentYear = new Date().getFullYear(); // Get the current year

  const [selectedYear, setSelectedYear] = useState(currentYear.toString()); // Set default year to current year
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expenseData, setExpenseData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedYear !== '') {
        try {
          const startOfYear = `${selectedYear}-01-01`;
          const endOfYear = `${selectedYear}-12-31`;

          let url = 'http://localhost:8080/api/expenses/getDataBetweenDates';
          if (selectedCategory !== '') {
            url = `http://localhost:8080/api/expenses/getDataBetweenDates?startDate=${startOfYear}&endDate=${endOfYear}&expenseType=${selectedCategory}`;
          }

          const response = await axios.get(url);

          setExpenseData(response.data);
          const total = response.data.reduce((acc, item) => acc + Number(item.grandTotal), 0);
          setTotalExpenses(total);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [selectedYear, selectedCategory]);

  return (
    <div className='flex flex-col h-screen'>
      <div className="max-w-xl mx-auto p-4 bg-white shadow-md ml-0">
        <h1 className="text-xl font-semibold mb-4">Select Year</h1>
        <div className="flex items-center mb-4">
          <input type="number" value={selectedYear} onChange={handleYearChange} className="rounded-l-md border border-gray-300 focus:outline-none px-3 py-2 w-60" placeholder="Enter year" />
          <div>
            <select value={selectedCategory} onChange={handleCategoryChange} className="rounded-l-md border border-gray-300 focus:outline-none px-3 py-2">
              <option value="">Select Category</option>
              <option value="employee">Employee</option>
              <option value="Routine">Routine</option>
              <option value="capital">Capital</option>
              <option value="Raw_material">Raw Material</option>
            </select>
          </div>
        </div>

      </div>

      <div className='max-w-4xl mt-8 bg-white shadow-md rounded-md justify-center items-center overflow-x-auto'>
        <h2 className="text-xl font-semibold p-4">Expense Data</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="sticky top-0 px-4 py-2 bg-gray-100">ID</th>
              <th className="sticky top-0 px-4 py-2 bg-gray-100">Date</th>
              <th className="sticky top-0 px-4 py-2 bg-gray-100">Expense</th>
            </tr>
          </thead>
          <tbody>
            {expenseData.map((expense) => (
              <tr key={expense.id}>
                <td className="border px-4 py-2 text-center">{expense.id}</td>
                <td className="border px-4 py-2 text-center">{expense.date}</td>
                <td className="border px-4 py-2 text-center">{expense.grandTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="p-4">Total Expenses: {totalExpenses}</p>
      </div>
    </div>
  );
}

export default Ex_Yearly;

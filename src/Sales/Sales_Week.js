import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sl_week() {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');
  const [ExpanceData, setExpanceData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const months = [
    { name: 'January', days: 31, numerical: '01' },
    { name: 'February', days: 28, numerical: '02' },
    { name: 'March', days: 31, numerical: '03' },
    { name: 'April', days: 30, numerical: '04' },
    { name: 'May', days: 31, numerical: '05' },
    { name: 'June', days: 30, numerical: '06' },
    { name: 'July', days: 31, numerical: '07' },
    { name: 'August', days: 31, numerical: '08' },
    { name: 'September', days: 30, numerical: '09' },
    { name: 'October', days: 31, numerical: '10' },
    { name: 'November', days: 30, numerical: '11' },
    { name: 'December', days: 31, numerical: '12' }
  ];

  const getWeeksInMonth = (year, month) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const numDays = lastDay.getDate();
    const weeks = [];
    let currentWeek = [];

    for (let i = 1; i <= numDays; i++) {
      const date = new Date(year, month - 1, i);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(date);
      if (i === numDays && currentWeek.length > 0) {
        weeks.push(currentWeek);
      }
    }
    return weeks.map((week, index) => ({
      name: `Week ${index + 1}`,
      startDate: week[0],
      endDate: week[week.length - 1]
    }));
  };

  const years = Array.from({ length: 6 }, (_, i) => 2022 + i); // Generate an array of years from 2000 to 2100

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const selectedMonthObj = months.find(month => month.name === selectedMonth);
      setStartDate(`${selectedYear}-${selectedMonthObj.numerical}-01`);
      setEndDate(`${selectedYear}-${selectedMonthObj.numerical}-${selectedMonthObj.days.toString().padStart(2, '0')}`);
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (startDate && endDate && selectedWeek) {
      const selectedMonthObj = months.find(month => month.name === selectedMonth);
      const weeksInMonth = getWeeksInMonth(selectedYear, selectedMonthObj.numerical);
      const selectedWeekIndex = parseInt(selectedWeek.substring(5)) - 1;
      setStartDate(weeksInMonth[selectedWeekIndex].startDate.toISOString().split('T')[0]);
      setEndDate(weeksInMonth[selectedWeekIndex].endDate.toISOString().split('T')[0]);
    }
  }, [startDate, endDate, selectedWeek]);

  useEffect(() => {
    if (startDate && endDate && selectedWeek) {
      fetchData();
    }
  }, [startDate, endDate, selectedWeek]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/invoices/getDataBetweenDates', {
        // const response = await axios.get('http://16.170.242.6:8080/api/invoices/getDataBetweenDates', {
        params: {
          startDate,
          endDate
        }
      });

      setExpanceData(response.data);
      const total = response.data.reduce((acc, item) => acc + Number(item.grandtotal), 0); // Assuming total expense is returned from backend
      setTotalExpenses(total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md p-4 bg-white shadow-md rounded-md justify-center items-center">
        <h1 className="text-xl font-semibold mb-4">Select Year, Month, and Week</h1>
        <div className="flex flex-col sm:flex-row mb-4">
          <div className="mr-2">
            <label htmlFor="yearSelect" className="mb-2">Select Year:</label>
            <select id="yearSelect" value={selectedYear} onChange={handleYearChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none">
              <option value="">Select Year</option>
              {years.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="mr-2">
            <label htmlFor="monthSelect" className="mb-2">Select Month:</label>
            <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none">
              <option value="">Select Month</option>
              {months.map((month, index) => (
                <option key={index} value={month.name}>{month.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="weekSelect" className="mb-2">Select Week:</label>
            <select id="weekSelect" value={selectedWeek} onChange={handleWeekChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none">
              <option value="">Select Week</option>
              {selectedMonth && months.find(month => month.name === selectedMonth) &&
                getWeeksInMonth(selectedYear, months.find(month => month.name === selectedMonth).numerical).map((week, index) => (
                  <option key={index} value={`Week ${index + 1}`}>{week.name}</option>
                ))}
            </select>
          </div>
        </div>
        {selectedWeek && startDate && endDate && (
          <p>{`Start Date of ${selectedWeek} is "${startDate}" and End Date of ${selectedWeek} is "${endDate}"`}</p>
        )}
      </div>
      {selectedWeek && startDate && endDate && (
        <div className="max-w-4xl mt-8 bg-white shadow-md rounded-md justify-center items-center overflow-x-auto">
          <h2 className="text-xl font-semibold p-4">Sales Data</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">SALES</th>
              </tr>
            </thead>
            <tbody>
              {ExpanceData.map((expense) => (
                <tr key={expense.id}>
                  <td className="border px-4 py-2 text-center">{expense.id}</td>
                  <td className="border px-4 py-2 text-center">{expense.date}</td>
                  <td className="border px-4 py-2 text-center">{expense.grandtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="p-4">Total Sales: {totalExpenses}</p>
        </div>
      )}
    </div>
  );
}

export default Sl_week;

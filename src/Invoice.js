// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import Logo from './Logo.png';
// import SignatureImage from './Signpdf.jpg';
// import { v4 as uuidv4 } from 'uuid';
// import Menu from './Sidebar';

// function Invoice() {
//   const [invoiceNo, setInvoiceNo] = useState(0);
//   const [productsList, setProductsList] = useState([]);
//   const [formData, setFormData] = useState({
//     customerName: '',
//     customerAddress: '',
//     date: '',
//     products: [{
//       srNo: 1,
//       productName: '',
//       price: '',
//       quantity: '',
//       total: ''
//     }],
//     amountPaid: '',
//     remainingAmount: '',
//     paymentMode: '',
//     discount: ''
//   });

//   useEffect(() => {
//     generateInvoiceNo();
//     fetchProducts();
//   }, []);

//   const generateInvoiceNo = () => {
//     let latestInvoiceNo = localStorage.getItem('latestInvoiceNo');
//     if (!latestInvoiceNo) {
//       latestInvoiceNo = 0;
//     }
//     const newInvoiceNo = parseInt(latestInvoiceNo, 10) + 1;
//     localStorage.setItem('latestInvoiceNo', newInvoiceNo);
//     setInvoiceNo(newInvoiceNo);
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/products');
//       setProductsList(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   // const handleProductSelect = (index, productId) => {
//   //   const products = [...formData.products];
//   //   const selectedProduct = productsList.find(product => product.id === parseInt(productId));
//   //   if (selectedProduct) {
//   //     products[index]['productName'] = selectedProduct.productName;
//   //     products[index]['price'] = selectedProduct.sellingPrice;
//   //     setFormData(prevState => ({ ...prevState, products }));
//   //   }
//   // };
//   const handleProductSelect = (index, productId) => {
//     const products = [...formData.products];
//     const selectedProduct = productsList.find(product => product.id === parseInt(productId));
//     if (selectedProduct) {
//       products[index]['productName'] = selectedProduct.productName;
//       products[index]['price'] = selectedProduct.sellingPrice;
//       products[index]['quantity'] = ''; // Reset quantity
//       products[index]['total'] = ''; // Reset total
//       setFormData(prevState => ({ ...prevState, products }));

//       // Populate available quantity
//       const availableQuantity = selectedProduct.availableQuantity;
//       if (!isNaN(availableQuantity)) {
//         products[index]['quantity'] = availableQuantity.toString(); // Populate quantity
//         setFormData(prevState => ({ ...prevState, products }));
//       }
//     }
//   };


//   const handleInputChange = (index, event) => {
//     const { name, value } = event.target;
//     const products = [...formData.products];
//     let total = 0;

//     if (name === 'quantity') {
//       const availableQuantity = parseInt(productsList[index]?.availableQuantity); // Access availableQuantity of the corresponding product
//       const enteredQuantity = parseInt(value);



//       products[index][name] = value;
//       const price = parseFloat(products[index]['price']);

//       if (!isNaN(price)) {
//         total = (enteredQuantity * price).toFixed(2);
//       }
//     } else {
//       products[index][name] = value;
//     }

//     products[index]['total'] = total;
//     setFormData(prevState => ({ ...prevState, products }));
//   };

//   const handleAddRow = () => {
//     const products = [...formData.products, { srNo: formData.products.length + 1, productName: '', price: '', quantity: '', total: '' }];
//     setFormData({ ...formData, products });
//   };

//   const calculateTotal = () => {
//     let grandTotal = 0;
//     formData.products.forEach(product => {
//       const total = parseFloat(product.quantity) * parseFloat(product.price);
//       grandTotal += isNaN(total) ? 0 : total;
//       product.total = isNaN(total) ? '' : total.toFixed(2);
//     });
//     // Apply discount if available
//     if (formData.discount && formData.discount > 0 && formData.discount <= 100) {
//       const discountAmount = (grandTotal * (formData.discount / 100));
//       grandTotal -= parseFloat(discountAmount);
//     }
//     return grandTotal; // Return the numeric value directly
//   };
//................................................................
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Logo from './Logo.png';
import SignatureImage from './Signpdf.jpg';
import { v4 as uuidv4 } from 'uuid';
import Menu from './Sidebar';

function Invoice() {
  const [invoiceNo, setInvoiceNo] = useState(0);
  const [productsList, setProductsList] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    customerAddress: '',
    date: '',
    mobileNumber: '',
    products: [{
      srNo: 1,
      productName: '',
      price: '',
      quantity: '',
      total: ''
    }],
    amountPaid: '',
    remainingAmount: '',
    paymentMode: '',
    discount: ''
  });

  useEffect(() => {
    fetchLatestInvoiceNo();
    fetchProducts();
  }, []);

  const fetchLatestInvoiceNo = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/invoices/latest');
      const latestInvoiceNo = response.data.latestInvoiceNo || 0;
      setInvoiceNo(parseInt(latestInvoiceNo, 10) + 1);
    } catch (error) {
      console.error('Error fetching latest invoice number:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products');
      setProductsList(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import Logo from './Logo.png';
// import SignatureImage from './Signpdf.jpg';
// import { v4 as uuidv4 } from 'uuid';
// import Menu from './Sidebar';

// function Invoice() {
//   const [invoiceNo, setInvoiceNo] = useState(0);
//   const [productsList, setProductsList] = useState([]);
//   const [formData, setFormData] = useState({
//     customerName: '',
//     customerAddress: '',
//     date: '',
//     mobileNumber: '',
//     products: [{
//       srNo: 1,
//       productName: '',
//       price: '',
//       quantity: '',
//       total: ''
//     }],
//     amountPaid: '',
//     remainingAmount: '',
//     paymentMode: '',
//     discount: ''
//   });

//   useEffect(() => {
//     generateInvoiceNo();
//     fetchProducts();
//   }, []);

//   // const generateInvoiceNo = () => {
//   //   let latestInvoiceNo = localStorage.getItem('latestInvoiceNo');
//   //   if (!latestInvoiceNo) {
//   //     latestInvoiceNo = 0;
//   //   }
//   //   const newInvoiceNo = parseInt(latestInvoiceNo, 10) + 1;
//   //   localStorage.setItem('latestInvoiceNo', newInvoiceNo);
//   //   setInvoiceNo(newInvoiceNo);
//   // };
//   const generateInvoiceNo = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/invoices/latest');
//       const latestInvoiceNo = response.data.latestInvoiceNo || 0;
//       const newInvoiceNo = parseInt(latestInvoiceNo, 10) + 1;
//       setInvoiceNo(newInvoiceNo);
//     } catch (error) {
//       console.error('Error fetching latest invoice number:', error);
//     }
//   };
  
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/products');
//       setProductsList(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

  const handleProductSelect = (index, productId) => {
    const products = [...formData.products];
    const selectedProduct = productsList.find(product => product.id === parseInt(productId));
    if (selectedProduct) {
      products[index]['productName'] = selectedProduct.productName;
      products[index]['price'] = selectedProduct.sellingPrice;
      products[index]['quantity'] = '';
      products[index]['total'] = '';
      setFormData(prevState => ({ ...prevState, products }));

      const availableQuantity = selectedProduct.availableQuantity;
      if (!isNaN(availableQuantity)) {
        products[index]['quantity'] = availableQuantity.toString();
        setFormData(prevState => ({ ...prevState, products }));
      }
    }
  };

  // const handleInputChange = (index, event) => {
  //   const { name, value } = event.target;
  //   const products = [...formData.products];
  //   let total = 0;

  //   if (name === 'quantity') {
  //     const availableQuantity = parseInt(productsList[index]?.availableQuantity);
  //     const enteredQuantity = parseInt(value);

  //     products[index][name] = value;
  //     const price = parseFloat(products[index]['price']);

  //     if (!isNaN(price)) {
  //       total = (enteredQuantity * price).toFixed(2);
  //     }
  //   } else {
  //     products[index][name] = value;
  //   }

  //   products[index]['total'] = total;
  //   setFormData(prevState => ({ ...prevState, products }));
  // };
 
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const products = [...formData.products];
    let total = 0;
  
    if (name === 'quantity') {
      const availableQuantity = parseInt(productsList[index]?.availableQuantity);
      const enteredQuantity = parseInt(value);
  
      if (enteredQuantity > availableQuantity) {
        // Display error message or handle invalid quantity input
        alert('Quantity cannot exceed available quantity!');
        return; // Prevent further processing
      }
  
      products[index][name] = value;
      const price = parseFloat(products[index]['price']);
  
      if (!isNaN(price)) {
        total = (enteredQuantity * price).toFixed(2);
      }
    } else {
      products[index][name] = value;
    }
  
    products[index]['total'] = total;
    setFormData(prevState => ({ ...prevState, products }));
  };
   
  const handleAddRow = () => {
    const products = [...formData.products, { srNo: formData.products.length + 1, productName: '', price: '', quantity: '', total: '' }];
    setFormData({ ...formData, products });
  };

  const calculateTotal = () => {
    let grandTotal = 0;
    formData.products.forEach(product => {
      const total = parseFloat(product.quantity) * parseFloat(product.price);
      grandTotal += isNaN(total) ? 0 : total;
      product.total = isNaN(total) ? '' : total.toFixed(2);
    });

    if (formData.discount && formData.discount > 0 && formData.discount <= 100) {
      const discountAmount = (grandTotal * (formData.discount / 100));
      grandTotal -= parseFloat(discountAmount);
    }
    return grandTotal;
  };


  const numberToWords = (number) => {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (number === 0) {
      return 'Zero';
    }

    let words = '';

    if (number >= 1000) {
      words += numberToWords(Math.floor(number / 1000)) + ' Thousand ';
      number %= 1000;
    }

    if (number >= 100) {
      words += units[Math.floor(number / 100)] + ' Hundred ';
      number %= 100;
    }

    if (number >= 20) {
      words += tens[Math.floor(number / 10)] + ' ';
      number %= 10;
    }

    if (number >= 10) {
      words += teens[number - 10] + ' ';
      number = 0;
    }

    if (number > 0) {
      words += units[number] + ' ';
    }

    return words.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const invoiceData = { ...formData, invoiceNo };
      await axios.post('http://localhost:8080/api/invoices', {
        ...invoiceData,
        mobileNumber: formData.mobileNumber
      });
      alert('Invoice submitted successfully!');
    } catch (error) {
      console.error('Error submitting invoice:', error);
      alert('Failed to submit invoice. Please try again later.');
    }
  };


  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amountPaid') {
      const remainingAmount = (calculateTotal() - parseFloat(value)).toFixed(2);
      setFormData({ ...formData, amountPaid: value, remainingAmount });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const generatePDF = (grandTotal, billNo, customerName) => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    const fontSize = 10;
    pdf.setFontSize(fontSize);
    // pdf.setFont('Helvetica');
    
    const borderWidth = 0.5;
    const borderColor = '#333';
    pdf.setLineWidth(borderWidth);
    pdf.setDrawColor(borderColor);
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'S');
    const img = new Image();
    img.src = Logo;
    pdf.addImage(img, 'PNG', 10, 10, 40, 40);
    pdf.setFontSize(10);
    pdf.setTextColor('#000');

    const headingX = pdf.internal.pageSize.getWidth() / 2;
    pdf.setFont('bold');
    pdf.text("Invoice", headingX, 10, { align: 'center' });

    const topRightX = pdf.internal.pageSize.getWidth() - 60;
    const topRightY = 10;
    pdf.setFont('bold');
    pdf.text("Shree Samarth Nursury", topRightX, topRightY);
    pdf.text("Nira-Lonand Road, At.Po,Padegaon", topRightX, topRightY + 5);
    pdf.text("Tal. Khandala, Dist. Satara, 415521", topRightX, topRightY + 10);
    pdf.text("Phone: 9730465591", topRightX, topRightY + 15);

    pdf.setTextColor('#000');
    // pdf.setFont('bold');
    pdf.text(`Invoice to:`, 15, 60);
    pdf.setFont('normal');
    const customerNameX = 15; // Adjust X position for Customer Name
    const customerAddressX = 15; // Adjust X position for Customer Address
    pdf.text(`Customer Name: ${formData.customerName}`, customerNameX, 70);
    pdf.text(`Customer Address: ${formData.customerAddress}`, customerAddressX, 75);
    pdf.text(`Mobile Number: ${formData.mobileNumber}`, customerAddressX, 80);
    pdf.text(`Invoice No: ${invoiceNo}`, 150, 70);

    const formattedDate = formData.date.split('-').reverse().join('-');
    pdf.text(`Date: ${formattedDate}`, 150, 75);

    let y = 85;
    const grandTotalRow = ['', '', '', '', ''];
    pdf.autoTable({
      startY: y,
      head: [['Sr No', 'Item Name', 'Price (Rs)', 'Quantity', 'Total (Rs)']],
      body: [
        ...formData.products
          .filter(product => product.productName || product.price || product.quantity || product.total)
          .map(product => [product.srNo, product.productName, product.price, product.quantity, product.total]),
        grandTotalRow
      ],
      theme: 'grid',
      styles: { halign: 'center', valign: 'middle', fontSize: 10 },
      columnStyles: {
        0: { halign: 'center' },
        2: { halign: 'center' },
        3: { halign: 'center' },
        4: { halign: 'center' }
      },

      didDrawCell: function (data) {
        if (data.row.index === formData.products.length && data.column.index === 4) {
          const grandTotalValueWidth = pdf.getStringUnitWidth(grandTotal.toFixed(2)) * pdf.internal.scaleFactor;
          const cellWidth = data.cell.width - data.cell.padding('horizontal');

          // Center the text horizontally
          const startX = data.cell.x + (cellWidth - grandTotalValueWidth) / 2;

          // Center the text vertically
          const startY = data.cell.y + data.cell.height / 2;

          pdf.setFont('bold');
          pdf.text(grandTotal.toFixed(2), startX, startY, { align: 'left', baseline: 'middle' }); // Adjusted align to left
        } else {
          if (data.row.index === formData.products.length) {
            if (data.column.index === 0) {
              pdf.setFont('bold');
              pdf.text('', data.cell.x + 2, data.cell.y + data.cell.height / 2, { align: 'left', baseline: 'middle' });
            } else if (data.column.index === 3) {
              const cellWidth = data.cell.width - data.cell.padding('horizontal');
              const grandTotalTextWidth = pdf.getStringUnitWidth('Grand Total') * pdf.internal.scaleFactor;
              const startX = data.cell.x + (cellWidth - grandTotalTextWidth) / 2; // Center the text horizontally
              pdf.setFont('bold');
              pdf.text('Grand Total', startX, data.cell.y + data.cell.height / 2, { align: 'left', baseline: 'middle' });
            }
          }
        }
      },





      margin: { bottom: 30 }
    });

    y = pdf.autoTable.previous.finalY;
    const totalAmountWords = numberToWords(parseFloat(grandTotal));

    const additionalDetailsData = [
      ['Discount (%):', `${formData.discount}%`],
      ['Amount Paid:', formData.amountPaid],
      ['Balance Amount:', formData.remainingAmount],
      ['Payment Mode:', formData.paymentMode]
    ];


    const additionalDetailsWidth = 182;
    const additionalDetailsHeight = additionalDetailsData.length * 10;
    const additionalDetailsX = pdf.internal.pageSize.getWidth() - additionalDetailsWidth - 10;
    const bankDetailsY = y + 10 + additionalDetailsHeight + 10;
    const signatureY = bankDetailsY + 15;

    // Total Amount (In Words) styling
    pdf.setFontSize(11);
    pdf.setFont('normal');
    const totalAmountY = pdf.autoTable.previous.finalY + 7;

    // Adjust the vertical position for visibility
    const marginTop = 0;
    pdf.text("Total Amount (In Words):", 15, totalAmountY + marginTop);

    // Apply different styling or font for the total amount in words
    pdf.setTextColor('#000');
    pdf.setFontSize(10);
    // pdf.setFont('bold');
    pdf.text(`${totalAmountWords} Rs Only`, 60, totalAmountY + marginTop);

    pdf.autoTable({
      body: additionalDetailsData,
      startY: y + 10,
      theme: 'grid',
      styles: { halign: 'left', valign: 'middle', fontSize: 10 },
      columnStyles: { 0: { halign: 'left',  cellWidth: 'wrap' } },
      margin: { bottom: 30 },
      tableWidth: additionalDetailsWidth,
      startX: additionalDetailsX
    });

    pdf.setLineWidth(0.2);
    pdf.setDrawColor('#000');
    pdf.rect(10, bankDetailsY, pdf.internal.pageSize.getWidth() - 20, 40, 'S');
    pdf.setFontSize(10);
    // pdf.setFont('bold');
    pdf.text("Bank Details", 15, bankDetailsY + 10);
    pdf.setFont('normal');
    pdf.text("Name: BANK OF BARODA", 15, bankDetailsY + 15);
    pdf.text("Account No: 04440200000597", 15, bankDetailsY + 20);
    pdf.text("IFSC code: BARB0LONAND", 15, bankDetailsY + 25);
    pdf.setFont('bold');
    pdf.text("For:Shree Samarth Nursury", pdf.internal.pageSize.width - 80, bankDetailsY + 10);
    pdf.addImage(SignatureImage, 'JPG', pdf.internal.pageSize.width - 80, bankDetailsY + 15, 30, 15);
    pdf.setFontSize(10);
    pdf.text("Authorized Signature", pdf.internal.pageSize.width - 75, bankDetailsY + 36);

    const additionalMessage = "This is Computer generated bill.";
    const additionalMessageWidth = pdf.getStringUnitWidth(additionalMessage) * 10;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.setFontSize(10);
    const shiftRight = 20;
    const textXAdditional = (pageWidth - additionalMessageWidth) / 1.3 + shiftRight;
    const textY = pageHeight - 5; // Adjust the Y position to place it below the footer
    pdf.text(additionalMessage, textXAdditional, textY);

    pdf.save(`${invoiceNo}-${customerName}.pdf`);

    // Generate next invoice number for the next invoice
    setInvoiceNo(prevInvoiceNo => prevInvoiceNo + 1);
  };



  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className='ml-0 h-screen'>
        <Menu />
      </div>
      <div className="container mx-auto mt-5 bg-white p-5 rounded-lg shadow-lg">
        <h1 className="text-2xl mb-4 text-center font-bold">Invoice</h1>
        <form id="invoiceForm" onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="customerName" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Customer Name</label>
            <input type="text" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="customerName" name="customerName" value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
          </div>
          <div>
            <label htmlFor="customerAddress" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Customer Address</label>
            <input type="text" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="customerAddress" name="customerAddress" value={formData.customerAddress} onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })} />
          </div>
          <div>
            <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Date</label>
            <input
              type="date"
              className="appearance-none border rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              name="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              max={new Date().toISOString().split('T')[0]} // Set max attribute to today's date
            />
          </div>
          <div className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
            <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
            <input type="text" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })} />
          </div>


          <table className="table-auto w-full mb-4 col-span-2">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center">Sr. No.</th>
                <th className="px-4 py-2 text-center">Item Name</th>
                <th className="px-4 py-2 text-center">Price (Rs)</th>
                <th className="px-4 py-2 text-center">Quantity</th>
                <th className="px-4 py-2 text-center">Total (Rs)</th>
              </tr>
            </thead>
            <tbody>
              {formData.products.map((product, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 flex items-center justify-center ">{product.srNo}</td>
                  <td className="border px-4 py-2 text-center">
                    {product.productName ? product.productName : (
                      <select
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={product.productName}
                        onChange={(e) => handleProductSelect(index, e.target.value)}
                      >
                        <option value="">Select Product</option>
                        {productsList.map((product) => (
                          <option key={product.id} value={product.id}>{product.productName}</option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td className="border px-4 py-2 ">
                    <input
                      type="number"
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
                      name="price"
                      value={product.price}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td className="border px-4 py-2 ">
                    <input
                      type="number"
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
                      name="quantity"
                      value={product.quantity}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
                      value={product.total}
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="text-right font-bold">Grand Total:</td>
                <td className="border px-4 py-2"><input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center" value={calculateTotal()} readOnly /></td>
              </tr>
              <tr>
                <td className="pr-8">
                  <label htmlFor="discount" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white ">Discount (%)</label>
                  <input type="number" min="0" max="100" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="discount" name="discount" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} />
                </td>
                <td className="pl-4">

                  <label htmlFor="amountPaid" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Amount Paid (Rs)</label>
                  <input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amountPaid" name="amountPaid" value={formData.amountPaid} onChange={handlePaymentInputChange} />
                </td>
                <td className="text-center">
                  <label htmlFor="remainingAmount" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Balance Amount (Rs)</label>
                  <input
                    type="number"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="remainingAmount"
                    name="remainingAmount"
                    value={formData.remainingAmount}
                    readOnly
                    style={{ width: '90%' }} // Adjust the width here
                  />
                </td>
                <td className="text-center pl-4" >
                  <label htmlFor="paymentMode" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Payment Mode</label>
                  <select className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="paymentMode" name="paymentMode" value={formData.paymentMode} onChange={handlePaymentInputChange}>
                    <option value="">Select Payment Mode</option>
                    <option value="Cash">Cash</option>
                    <option value="Online">Online</option>
                  </select>
                </td>
                {/* <td className="pl-4">

                  <label htmlFor="amountPaid" className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Amount Paid (Rs)</label>
                  <input type="number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amountPaid" name="amountPaid" value={formData.amountPaid} onChange={handlePaymentInputChange} />
                </td> */}

              </tr>


            </tfoot>
          </table>

          <div className="col-span-2 mb-4">
            <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddRow}>Add Product</button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Submit</button>
            <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => generatePDF(calculateTotal(), invoiceNo, formData.customerName)}>Print</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Invoice;
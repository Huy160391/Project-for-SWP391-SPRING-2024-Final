import React from 'react';
import './a.css'; // Make sure to create a CSS file for styling

const Transactions = () => {
  // This is dummy data, you would replace this with data from your backend
  const transactionsData = [
    { customerName: 'Karen Hope', id: '#123456789', createDate: 'March 25, 2021', totalAmount: '3 tỷ', status: 'Done' },
    // ... more transactions
  ];

  return (
    <div className="transactions-container">
      <h1>Transaction</h1>
      <div className="transactions-search">
        <input type="text" placeholder="Search here..." />
        <select>
          <option value="newest">Newest</option>
          {/* Other sort options */}
        </select>
      </div>
      <div className="transactions-list">
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>ID</th>
              <th>Create Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactionsData.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.customerName}</td>
                <td>{transaction.id}</td>
                <td>{transaction.createDate}</td>
                <td>{transaction.totalAmount}</td>
                <td>{transaction.status}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {/* Pagination logic will go here */}
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </div>
    </div>
  );
};

export default Transactions;

import React, { useEffect, useState, ChangeEvent } from 'react';
import { CustomerType } from '../types/customer';

const PAGE_SIZE = 10;

export default function CustomerTable() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CustomerType[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/customers?page=${page}&search=${debouncedSearch}`
      );
      const json = await res.json();
      setData(json.data);
      setTotal(json.totalData);
    } catch (err) {
      console.error('Gagal fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, debouncedSearch]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="p-4 mx-auto ">
      <h1 className="text-2xl font-bold">Customer Data Table</h1>
      <p className='text-gray-500 mb-4'>Complete customer information with search</p>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search name, email, brand, or location..."
          className="input input-bordered w-full"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <div className="text-center py-10">
          <span className="loading loading-spinner loading-md"></span>
          <p className="mt-2">Loading data...</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table table-md">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th className="text-center">No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>No Telp</th>
                <th>Brand Device</th>
                <th>Digital Interest</th>
                <th>Login Hour</th>
                <th>Date</th>
                <th>Name of Location</th>
                <th>Location Type</th>
              </tr>

            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={12} className="text-center py-4">
                    No data found
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={item._id || idx}>
                    <td className="text-center">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                    <td>{item.Name}</td>
                    <td>{item.Email}</td>
                    <td>{item.Age}</td>
                    <td>{item.gender}</td>
                    <td>{item["No Telp"]}</td>
                    <td>{item["Brand Device"]}</td>
                    <td>{item["Digital Interest"]}</td>
                    <td>{item["Login Hour"]}</td>
                    <td>{item.Date}</td>
                    <td>{item["Name of Location"]}</td>
                    <td>{item["Location Type"]}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            className="btn btn-sm btn-outline"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            « Prev
          </button>
          <span className="text-sm">
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </span>
          <button
            className="btn btn-sm btn-outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          >
            Next »
          </button>
        </div>
      )}
    </div>
  );
}

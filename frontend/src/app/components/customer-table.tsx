import React, { useEffect, useState, ChangeEvent } from 'react';
import { CustomerType } from '../types/customer';

const PAGE_SIZE = 10;

export default function TableWithAPI() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CustomerType[]>([]);
  const [total, setTotal] = useState(0);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/customers?page=${page}&search=${search}`
      );
      const json = await res.json();
      setData(json.data);
      setTotal(json.total); // jumlah semua data (tanpa pagination)
    } catch (err) {
      console.error('Gagal fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  // fetch saat page atau search berubah
  useEffect(() => {
    fetchCustomers();
  }, [page, search]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-4 mx-auto max-w-4xl">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari nama..."
          className="input input-bordered w-full"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <div className="text-center">Memuat data...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name of Location</th>
                <th>Date</th>
                <th>Login Hour</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item._id}>
                    {/* <td>{item.id}</td> */}
                    <td>{item.Name}</td>
                    <td>{item.}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            « Prev
          </button>
          <span>
            Halaman {page} dari {totalPages}
          </span>
          <button
            className="btn btn-sm"
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

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Riwayat() {
  const [riwayat, setRiwayat] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  
    const riwayatStunting = JSON.parse(localStorage.getItem('riwayatStunting')) || [];
    setRiwayat(riwayatStunting);
  }, []);

  const handleKembali = () => {
    navigate('/Hasil'); 
  };

  const handleHapusRiwayat = () => {
    localStorage.removeItem('riwayatStunting'); 
    setRiwayat([]); 
  };

  return (
    <div className="app">
      <h1>📜 Riwayat 📜</h1>

      <div style={{ fontFamily: 'Comfortaa', marginBottom: '20px' }} id='button'>
        <button
          onClick={handleKembali}
         
        >
          Kembali ke Hasil
        </button>

        <button
          onClick={handleHapusRiwayat}
         
        >
          Hapus Riwayat
        </button>
      </div>

      <div style={{ fontSize: '2vw', fontFamily: 'Comfortaa' }} id='riwayat'>
        {riwayat.length === 0 ? (
          <p>Tidak ada riwayat pengukuran.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {riwayat.map((data, index) => (
              <li
                key={index}
                style={{
                  padding: '2vw',
                  border: '2px solid #000',
                  borderRadius: '3vw',
                  margin: '10px auto',
                  maxWidth: '600px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <p>Tanggal: {data.tanggal}</p>
                <p>Jenis Kelamin:{data.jenisKelamin === '1' ? 'Laki-laki' : 'Perempuan'}</p>
                <p>Usia: {data.usia} bulan</p>
                <p>Tinggi Badan: {data.tinggiBadan} cm</p>
                <p>Status:{data.statusStunting}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
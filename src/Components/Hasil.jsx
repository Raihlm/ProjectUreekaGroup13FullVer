import React, { useEffect, useState } from 'react';
import data from '../data.json';
import { useNavigate } from 'react-router-dom';

export default function Hasil() {
  const [statusStunting, setStatusStunting] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const simpanRiwayat = (dataRiwayat) => {
    const riwayatStunting = JSON.parse(localStorage.getItem('riwayatStunting')) || [];
    
    const isDuplicate = riwayatStunting.some(
      (item) =>
        item.tanggal === dataRiwayat.tanggal &&
        item.jenisKelamin === dataRiwayat.jenisKelamin &&
        item.usia === dataRiwayat.usia &&
        item.tinggiBadan === dataRiwayat.tinggiBadan &&
        item.statusStunting === dataRiwayat.statusStunting
    );

    if (!isDuplicate) {
      riwayatStunting.push(dataRiwayat);
      localStorage.setItem('riwayatStunting', JSON.stringify(riwayatStunting));
    }
  };

  useEffect(() => {
   
    const stuntingData = JSON.parse(localStorage.getItem('stuntingData'));

    if (!stuntingData) {
      setError('Data tidak ditemukan. Silakan kembali ke halaman Pengukuran.');
      return;
    }

    const { jenisKelamin, usia, tinggiBadan } = stuntingData;

    const genderData = jenisKelamin === '1' ? data.boys : data.girls;
    const ageData = genderData[usia.toString()];

    if (!ageData) {
      setError('Data referensi tidak ditemukan untuk usia ini.');
      return;
    }

    const { median, std_dev } = ageData;
    const zScore = (tinggiBadan - median) / std_dev;

    let statusStunting;
    if (zScore < -2) {
      statusStunting = 'Stunting';
    } else {
      statusStunting = 'Sehat';
    }
    setStatusStunting(statusStunting);

    const dataRiwayat = {
      jenisKelamin,
      usia,
      tinggiBadan,
      statusStunting,
      tanggal: new Date().toLocaleString(), 
    };

    simpanRiwayat(dataRiwayat);
  }, []);

  const handleKembali = () => {
    navigate('/Pengukuran');
  };

  const handleHistory = () => {
    navigate('/History');
  };

  function getStatusMessage(statusStunting) {
    if (statusStunting === 'Stunting') {
      return 'Yah kamu berpotensi stunting, Ayo perbaiki pola makan dan minum vitamin supaya sehat ya!';
    } else {
      return 'Yey kamu sehat!! Tetap jaga pola makan dan tidur yang cukup yaa!!';
    }
  }

  function getArticleLink(statusStunting) {
    if (statusStunting === 'Stunting') {
      return (
        <a
          href="https://www.halodoc.com/artikel/ini-dokter-ini-akan-bantu-perawatan-anak-stunting?srsltid=AfmBOoqZeSOx_EJE0GjXLgFmIo79180oAK3o8zPUu_RwdO801Vc3S20T"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '3vw', fontWeight: 'bold', color: '#0645AD', textDecoration: 'underline' }}
        >
          
          🐣 Kontak dokter untuk konsultasi stunting 🐣
        </a>
      );
    } else {
      return (
        <a
          href="https://www.alodokter.com/pilihan-makanan-sehat-untuk-bayi-berusia-4-12-bulan"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '3vw', fontWeight: 'bold', color: '#0645AD', textDecoration: 'underline' }}
        >
          🐣 Yuk cek menu makanan agar kamu tetap sehat 🐣

        </a>
      );
    }
  }
  return (
    <div className="app">
      <h1>👀Hasil👀</h1>

      {error ? (
        <p style={{ color: 'red', fontSize: '16px', fontWeight: 'bold' }}>{error}</p>
      ) : (
        <div>
       
          <button
            id="buttonBack"
            onClick={handleKembali}
            style={{
              padding: '1.8vw 1.8vw',
              fontFamily: 'Comfortaa',
              fontSize: '1.5vw',
              fontWeight: 'bold',
              backgroundColor: '#283618',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              margin: '10px',
            }}
          >
            Kembali ke Pengukuran
          </button>

        
          <button
            id="buttonHistory"
            onClick={handleHistory}
            style={{
              padding: '1.8vw 1.8vw',
              fontFamily: 'Comfortaa',
              fontSize: '1.5vw',
              fontWeight: 'bold',
              backgroundColor: '#283618',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              margin: '10px',
            }}
          >
            Lihat Data Sebelumnya
          </button>

       
          <div
            style={{
              padding: '3vw',
              border: '2px solid #000',
              borderRadius: '3vw',
              textAlign: 'center',
              fontSize: '3vw',
              fontWeight: 'bold',
              margin: '20px auto',
              maxWidth: '300px',
              fontFamily: 'Comfortaa',
              backgroundColor: statusStunting === 'Stunting' ? '#ffcccc' : '#ccffcc',
            }}
          >
            {statusStunting}
            
          </div>
          <div
            id="boxPenjelasan"
            style={{
              padding: '2vw',
              border: '2px solid #000',
              borderRadius: '3vw',
              textAlign: 'center',
              fontSize: '2vw',
              fontWeight: 'bold',
              margin: '2vw auto',
              maxWidth: '50vw',
              fontFamily: 'Comfortaa',
              backgroundColor: statusStunting === 'Stunting' ? '#ffcccc' : '#ccffcc',
            }}
          >
            <p>{getStatusMessage(statusStunting)}</p>
          </div>

          <div
            id="linkArtikel"
            style={{
              marginTop: '5vw',
              textAlign: 'center',
            }}
          >
            {getArticleLink(statusStunting)}
          </div>
        </div>
      )}
    </div>
  );
}
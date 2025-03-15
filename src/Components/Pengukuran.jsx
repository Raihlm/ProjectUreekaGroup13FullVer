import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Pengukuran() {
  const [jenisKelamin, setJenisKelamin] = useState('1'); 
  const [usia, setUsia] = useState(''); 
  const [tinggiBadan, setTinggi] = useState(''); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setError('');

    if (!usia || !tinggiBadan) {
      setError('Mohon isi usia dan tinggi badan!');
      return;
    }

    if (isNaN(usia) || isNaN(tinggiBadan)) {
      setError('Usia dan tinggi badan harus berupa angka!');
      return;
    }

    const usiaNumber = parseFloat(usia);
    const tinggiBadanNumber = parseFloat(tinggiBadan);

    if (usiaNumber < 0 || usiaNumber > 60) {
      setError('Usia harus antara 0 hingga 60 bulan.');
      return;
    }

    if (tinggiBadanNumber < 0) {
      setError('Tinggi badan harus valid.');
      return;
    }

    const data = {
      jenisKelamin,
      usia: usiaNumber,
      tinggiBadan: tinggiBadanNumber,
    };

    localStorage.setItem('stuntingData', JSON.stringify(data));
    navigate('/Hasil');
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Hapus data login
    navigate("/"); // Arahkan ke Homepage
  };

  return (
    <div className="app" id='root'>
      <h1>👣Pengukuran👣</h1>
      <form className="add-form" onSubmit={handleSubmit}>
        <p style={{ fontSize: "3vw", color: "black", fontWeight: "bold", fontFamily: 'Comfortaa' }}>
          Masukan Data Anak
        </p>
        <div>
          <select value={jenisKelamin} onChange={(e) => setJenisKelamin(e.target.value)}>
            <option value="1">Laki Laki</option>
            <option value="2">Perempuan</option>
          </select>
        </div>

        <div className="isiDataMeasurement">
          <input
            type="text"
            id="Data1"
            placeholder="usia anak (bulan).."
            value={usia}
            onChange={(e) => setUsia(e.target.value)}
            required 
          />
          <input
            type="text"
            id="Data2"
            placeholder="tinggi badan (cm) ..."
            value={tinggiBadan}
            onChange={(e) => setTinggi(e.target.value)}
            required 
          />
        </div>

        {error && <p style={{ color: 'red', fontSize: '3vw', fontWeight: 'bold' }}>{error}</p>} 

        <div>
          <p id="howDoesItWork"> Bagaimana Pengertiannya ? </p>
          <p id="penjelasan">
            Stunting adalah gangguan pertumbuhan yang ditandai ketika tinggi badan lebih rendah dari rata rata anak
            seusianya. Stunting disebabkan karena kekurangan gizi kronis dan infeksi berulang. Stunting juga bisa terjadi
            sebagai dampak dari kurangnya asupan gizi ibu saat hamil. Perhitungan anak masuk dalam kategori stunting atau
            tidak dilakukan dengan standar perhitungan dari WHO (World Health Organization)
          </p>
        </div>

        <button type="submit">Hitung</button>
        <button id="logOut" onClick={handleLogout}>Keluar Akun</button>
      </form>
    </div>
  );
}

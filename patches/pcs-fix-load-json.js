// Patch: Improved fetch JSON handling for PCS load endpoints
// File: patches/pcs-fix-load-json.js
// Purpose: Safe JSON parsing and better error logging when server returns HTML (e.g., login page or PHP error).

// Instructions:
// 1) Open PCS.html and locate the existing `async function loadData()` implementation.
// 2) Replace that function's body with the `loadData` implementation below.
// 3) Open PSIKoTES.html and locate `function loadStudentsFromServer()` and replace it with the implementation below.
// 4) Commit changes and deploy. Alternatively, you can include this file as a reference and copy the functions manually.

// Secure loadData replacement for PCS.html
async function loadData() {
  if (!PCS_API_BASE || PCS_API_BASE === 'https://yourdomain.com/api') {
    console.warn('PCS API belum aktif. Isi window.PCS_API_BASE dengan URL Hostinger Anda.');
    return;
  }

  try {
    const response = await fetch(`${PCS_API_BASE}/load.php`);
    if (!response.ok) {
      const text = await response.text();
      console.error('Load API failed:', response.status, text);
      throw new Error(`Load API failed: HTTP ${response.status}`);
    }

    const contentType = (response.headers.get('content-type') || '').toLowerCase();
    let result;
    if (contentType.includes('application/json')) {
      result = await response.json();
    } else {
      // Server returned HTML or plain text — capture for debugging
      const text = await response.text();
      console.error('Expected JSON from load.php but received:', text);
      throw new Error('Server returned non-JSON response. Cek console / network tab untuk detail.');
    }

    const incoming = result && result.data ? result.data : result;
    if (incoming && Array.isArray(incoming.students)) {
      students = incoming.students;
      idCounter = Number(incoming.idCounter || students.length + 1);
    }
  } catch (error) {
    console.error('API load gagal:', error);
    // Optional: show friendly UI message
    const authErrorEl = document.querySelector('.auth-error');
    if (authErrorEl) {
      authErrorEl.textContent = 'Gagal mengambil data dari server. Cek konfigurasi API atau lihat console untuk detail.';
    }
    // Do not rethrow to avoid breaking UI unnecessarily; if callers expect an exception, remove the following line
    // throw error;
  }
}

// Safe loadStudentsFromServer replacement for PSIKoTES.html
function loadStudentsFromServer() {
  if (!window.PCS_API_BASE || window.PCS_API_BASE === 'https://yourdomain.com/api') {
    console.warn('PCS API belum aktif. Isi window.PCS_API_BASE dengan URL Hostinger Anda.');
    return Promise.resolve([]);
  }
  return fetch(`${window.PCS_API_BASE}/load.php`)
    .then(async response => {
      if (!response.ok) {
        const text = await response.text();
        console.error('load.php failed:', response.status, text);
        throw new Error(`load failed: HTTP ${response.status}`);
      }

      const contentType = (response.headers.get('content-type') || '').toLowerCase();
      let result;
      if (contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        console.error('Expected JSON but got non-JSON from server:', text);
        throw new Error('Server returned non-JSON response.');
      }

      const payload = result && result.data ? result.data : result;
      if (payload && Array.isArray(payload.students)) {
        localStorage.setItem('students', JSON.stringify(payload.students));
        localStorage.setItem('idCounter', String(payload.idCounter || payload.students.length + 1));
        return payload.students;
      }
      return [];
    })
    .catch(error => {
      console.error('Server data unavailable:', error);
      return [];
    });
}

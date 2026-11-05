/**
 * ============================================================================
 * CAMPUSEATS - ARCHITECTURE & CODEBASE REFERENCE NOTE
 * Course: BICS 3301 Cross-Platform Software Development
 * Student: ameer (2417639)
 * Milestone: Week 4 (React Milestone Complete)
 * ============================================================================
 * 
 * 1. EXECUTION FLOW & ROUTING LIFECYCLE
 * ----------------------------------------------------------------------------
 * 
 *   index.html 
 *     │ Loads root DOM node `<div id="root"></div>`
 *     ▼
 *   src/main.jsx
 *     │ Mounts React using `createRoot` inside `<StrictMode>`
 *     ▼
 *   src/App.jsx
 *     │ Wraps tree in `<BrowserRouter>` (history API) + `<CartProvider>` (Context)
 *     │ Defines Routes table nested inside `<Layout />`:
 *     │   ├── "/"           -> <HomePage />     (Vendor directory & Recent items)
 *     │   ├── "vendor/:id"  -> <VendorPage />   (Menu viewer by params :id)
 *     │   ├── "cart"        -> <CartPage />     (Order review & Checkout)
 *     │   ├── "orders"      -> <OrdersPage />   (Submitted orders history)
 *     │   └── "*"           -> <NotFoundPage /> (404 Fallback)
 *     ▼
 *   src/components/Layout.jsx
 *     │ Renders persistent <Header /> and <Footer />
 *     │ Uses `<Outlet />` to render the matched child page
 * 
 * ============================================================================
 * 2. COMPONENT & MODULE DIRECTORY BREAKDOWN
 * ============================================================================
 */

export const CODEBASE_DOCUMENTATION = {
  // --------------------------------------------------------------------------
  // A. DATA LAYER
  // --------------------------------------------------------------------------
  dataLayer: {
    "public/api/vendors.json": {
      role: "Mock Backend API",
      description:
        "Acts as a static database endpoint fetched over HTTP via /api/vendors.json. " +
        "Contains vendor metadata (matric-prefixed IDs, name, location, hours, isOpen) " +
        "and categorised menu items with prices and availability."
    }
  },

  // --------------------------------------------------------------------------
  // B. CUSTOM HOOKS (src/hooks/)
  // --------------------------------------------------------------------------
  customHooks: {
    "useLocalStorage(key, initialValue)": {
      location: "src/hooks/useLocalStorage.js",
      role: "State Persistence",
      howItWorks: [
        "1. Initializes state from localStorage.getItem(key) inside a try/catch block.",
        "2. If missing or invalid JSON, falls back safely to initialValue.",
        "3. Synchronizes with localStorage.setItem(key, JSON.stringify(value)) inside useEffect whenever state changes.",
        "4. Ensures the cart, orders, and recently viewed items survive page refreshes."
      ]
    },

    "useVendors()": {
      location: "src/hooks/useVendors.js",
      role: "Data Fetching & Lifecycle Management",
      howItWorks: [
        "1. Executes fetch('/api/vendors.json') inside useEffect.",
        "2. Uses AbortController to abort pending requests if the component unmounts.",
        "3. Exposes { vendors, loading, error, reload } to consuming components.",
        "4. reload() increments reloadKey to re-trigger the fetch effect on demand."
      ]
    },

    "useCart()": {
      location: "src/hooks/useCart.js",
      role: "Context Consumer Wrapper",
      howItWorks: [
        "1. Calls useContext(CartContext).",
        "2. Guards against illegal usage by throwing an explicit Error if rendered outside <CartProvider>."
      ]
    }
  },

  // --------------------------------------------------------------------------
  // C. CONTEXT API (src/context/)
  // --------------------------------------------------------------------------
  contextApi: {
    "CartContext": {
      location: "src/context/cart-context.js",
      role: "Context object created using createContext(null)."
    },

    "CartProvider": {
      location: "src/context/CartProvider.jsx",
      role: "Global State Store for E-Commerce Operations",
      stateHeld: [
        "cart: Array of lines [{ item, vendorId, qty }]. Persisted with useLocalStorage.",
        "orders: Array of confirmed orders [{ id, items, total, name, ... }]. Persisted with useLocalStorage."
      ],
      actionsProvided: {
        "addToCart(item, vendorId)":
          "Increments qty if item exists in cart; appends new line if absent.",
        "changeQty(itemId, delta)":
          "Adjusts quantity (+1 / -1) and filters out lines whose qty drops to 0.",
        "removeFromCart(itemId)":
          "Removes a specific product row from the cart array.",
        "placeOrder(details)":
          "Derives final total, generates order timestamp, appends to orders, and flushes cart."
      },
      derivedValues: {
        "count": "cart.reduce((sum, line) => sum + line.qty, 0) -- Total individual items in cart.",
        "total": "cart.reduce((sum, line) => sum + line.item.price * line.qty, 0) -- Order total cost."
      }
    }
  },

  // --------------------------------------------------------------------------
  // D. SHARED UI COMPONENTS (src/components/)
  // --------------------------------------------------------------------------
  uiComponents: {
    "Layout.jsx":
      "Standard application shell. Renders <Header />, <Outlet /> in <main className='container'>, and <Footer />.",

    "Header.jsx":
      "Global top navigation. Uses NavLink for active styling and displays live badge count from useCart().",

    "Footer.jsx":
      "Footer component displaying dynamic year and course details.",

    "Status.jsx":
      "Renders <Loading /> spinner/text and <ErrorMessage /> with a 'Try again' retry button.",

    "VendorCard.jsx":
      "Vendor summary card wrapped in <Link to={`/vendor/${vendor.id}`}> for deep routing.",

    "MenuList.jsx":
      "Iterates over menu array and maps each record to a <MenuItemCard /> with a unique key.",

    "MenuItemCard.jsx":
      "Displays item thumbnail, name, description, category tag, and price. " +
      "Invokes onView(item) on card click and addToCart() on button click (e.stopPropagation prevents card trigger).",

    "CartItem.jsx":
      "Stateless cart row displaying unit price, subtotal, -/+ qty buttons, and remove action.",

    "CheckoutForm.jsx":
      "Controlled input form. Intercepts submission with e.preventDefault() and validates: " +
      "1. Name >= 3 characters | 2. Mahallah selected | 3. Pickup time between 07:00 and 22:00."
  },

  // --------------------------------------------------------------------------
  // E. PAGE VIEWS (src/pages/)
  // --------------------------------------------------------------------------
  pages: {
    "HomePage.jsx": {
      route: "/",
      description:
        "Displays vendor list. Incorporates Personal Feature 9 (Recently Viewed items) " +
        "persisted via useLocalStorage, rendering clickable cards that route back to /vendor/:id."
    },

    "VendorPage.jsx": {
      route: "/vendor/:id",
      description:
        "Extracts :id with useParams(). Displays vendor details and menu. " +
        "Handles unknown vendors (fallback message) and adds clicked items into recently viewed memory."
    },

    "CartPage.jsx": {
      route: "/cart",
      description:
        "Renders items from useCart() alongside <CheckoutForm />. " +
        "On valid checkout, commits order and navigates to /orders programmatically via useNavigate()."
    },

    "OrdersPage.jsx": {
      route: "/orders",
      description:
        "Renders purchase receipts for confirmed orders stored in context."
    },

    "NotFoundPage.jsx": {
      route: "*",
      description:
        "404 wildcard route catching invalid or broken URL endpoints."
    }
  }
};

export default CODEBASE_DOCUMENTATION;





/**
 * ============================================================================
 * PENERANGAN MUDAH SISTEM CAMPUSEATS (ANALOGI MEDAN SELERA)
 * Fail: src/PANDUAN_MUDAH.js
 * Pelajar:ameer(2417639)
 * Kursus: BICS 3301 Cross-Platform Software Development
 * ============================================================================
 */

export const PANDUAN_MEDAN_SELERA = {
  // --------------------------------------------------------------------------
  // 1. ALIRAN PERJALANAN PENGGUNA (DARI MULA SAMPAI SELESAI)
  // --------------------------------------------------------------------------
  aliranPerjalanan: {
    langkah1_PintuMasuk: {
      fail: "index.html & src/main.jsx",
      tugas: "Pintu pagar utama medan selera.",
      penjelasan: 
        "Buka pintu dan pasang skrin paparan pertama kali supaya pelanggan boleh nampak kedai."
    },

    langkah2_PapanTandaArah: {
      fail: "src/App.jsx (Pelayar / BrowserRouter)",
      tugas: "Kaunter maklumat dan papan tanda arah di tengah medan selera.",
      penjelasan: 
        "Hantar pelanggan ke bilik yang betul serta-merta tanpa perlu muat semula skrin (tanpa reload):",
      laluanBilik: {
        "/": "Bilik Dewan Utama (tunjuk semua kedai & makanan baru dilihat)",
        "/vendor/:id": "Masuk terus ke hadapan kiosk kedai tertentu",
        "/cart": "Kaunter dulang makanan untuk semak barang & bayar",
        "/orders": "Papan notis resit bagi pesanan yang sudah dibuat",
        "*": "Tanda amaran 'Bilik / Kiosk Ini Tidak Wujud' (404)"
      }
    },

    langkah3_BumbungDanLantai: {
      fail: "src/components/Layout.jsx",
      tugas: "Struktur bumbung (Header) dan lantai (Footer).",
      penjelasan: 
        "Pengepala atas dan kaki bawah kekal ada sepanjang masa. " +
        "Hanya ruang dewan tengah (<Outlet />) yang bertukar mengikut halaman yang anda pilih."
    }
  },

  // --------------------------------------------------------------------------
  // 2. TUGAS SETIAP PEKERJA & ALAT DALAM SISTEM
  // --------------------------------------------------------------------------
  pekerjaDanAlat: {
    pelayanMenu: {
      fail: "public/api/vendors.json & src/hooks/useVendors.js",
      tugas: "Buku menu rasmi kedai-kedai.",
      huraian: 
        "Pelayan pergi ambil senarai makanan, harga dan status buka/tutup daripada fail data untuk dipaparkan."
    },

    dulangMakanan: {
      fail: "src/context/CartProvider.jsx & src/hooks/useCart.js",
      tugas: "Dulang makanan bersama yang dibawa pusing medan selera.",
      tindakan: {
        tambah: "Masukkan hidangan ke dalam dulang.",
        tambahKuantiti: "Tekan butang '+' untuk tambah bilangan.",
        kurangKuantiti: "Tekan butang '-' untuk kurangkan bilangan.",
        padamAutomatik: "Jika kuantiti jadi 0, makanan terus dibuang daripada dulang.",
        kiraJumlah: "Harga dan jumlah bilangan makanan terus dikira automatik tanpa perlu tulis semula."
      }
    },

    bukuNotaPoket: {
      fail: "src/hooks/useLocalStorage.js",
      tugas: "Buku catatan poket untuk keselamatan data.",
      huraian: 
        "Menyalin isi dulang dan rekod makanan ke dalam memori komputer/telefon. " +
        "Jika tertekan 'Refresh' atau bateri habis, makanan dalam dulang tidak akan hilang."
    },

    kaunterBayaranTegas: {
      fail: "src/components/CheckoutForm.jsx",
      tugas: "Juruwang kaunter yang memeriksa borang pesanan.",
      syaratLulus: [
        "1. Nama mesti sekurang-kurangnya 3 huruf.",
        "2. Wajib pilih salah satu Mahallah.",
        "3. Masa ambil makanan mestilah antara 7:00 pagi hingga 10:00 malam."
      ],
      hasil: "Jika semua maklumat lengkap, pesanan disahkan, dulang dikosongkan, dan pembeli dibawa ke papan resit (/orders)."
    },

    ingatanMakananBaruDilihat: {
      ciri: "Recently Viewed (Feature 9)",
      fail: "src/pages/HomePage.jsx & src/pages/VendorPage.jsx",
      tugas: "Kamera ingatan hidangan pilihan.",
      huraian: 
        "Setiap kali kad makanan diklik, sistem catat maklumatnya (maksimum 5 hidangan berbeza). " +
        "Bila pulang ke dewan utama (Home), hidangan tersebut dipaparkan di bawah sebagai jalan pintas untuk terus ke kedai itu."
    }
  }
};

export default PANDUAN_MEDAN_SELERA;
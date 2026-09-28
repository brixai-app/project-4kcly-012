import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer, { CartItem } from './components/CartDrawer';
import SearchOverlay from './components/SearchOverlay';
import WelcomeModal from './components/WelcomeModal';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Orders from './pages/Orders';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import AdminSignIn from './pages/AdminSignIn';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminProductNew from './pages/AdminProductNew';
import AdminCategories from './pages/AdminCategories';
import AdminCollections from './pages/AdminCollections';
import AdminOrders from './pages/AdminOrders';
import AdminSiteContent from './pages/AdminSiteContent';

export default function App() {
  const currentStoreBrand = 'N&S';

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [user, setUser] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('ditris_user_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Global Dynamic Products State with Brand-Match Guard
  const [products, setProducts] = useState<any[]>(() => {
    try {
      const savedBrand = localStorage.getItem('ditris_brand_owner');
      const savedProducts = localStorage.getItem('ditris_products');
      if (savedBrand === currentStoreBrand && savedProducts) {
        return JSON.parse(savedProducts);
      }
      return [{"id":"p1","title":"URBAN ESSENTIAL JACKET","displayCategory":"Outerwear","price":120,"imageCategory":"outerwear","tag":"BESTSELLER","description":"Lightweight, durable jacket perfect for any season with a sleek modern fit.","image":"https://images.unsplash.com/photo-1539533018447-63fcce667823?q=80&w=800&auto=format&fit=crop"},{"id":"p2","title":"COMFORT FIT T-SHIRT","displayCategory":"Tops","price":35,"imageCategory":"tops","tag":"NEW ARRIVAL","description":"Soft breathable cotton t-shirt, ideal for everyday comfort and style.","image":"https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=800&auto=format&fit=crop"},{"id":"p3","title":"SLIM CHINO PANTS","displayCategory":"Bottoms","price":60,"imageCategory":"trousers","tag":"BESTSELLER","description":"Tailored chinos with a slim cut, offering both style and versatility.","image":"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop"},{"id":"p4","title":"MINIMALIST LEATHER BACKPACK","displayCategory":"Accessories","price":150,"imageCategory":"bags","tag":"NEW ARRIVAL","description":"Crafted from premium leather, this backpack balances form and function.","image":"https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"},{"id":"p5","title":"CLASSIC DENIM JACKET","displayCategory":"Outerwear","price":110,"imageCategory":"outerwear","tag":"","description":"Timeless denim jacket with a comfortable fit and authentic details.","image":"https://images.unsplash.com/photo-1539533018447-63fcce667823?q=80&w=800&auto=format&fit=crop"},{"id":"p6","title":"ECO-FRIENDLY SNEAKERS","displayCategory":"Footwear","price":80,"imageCategory":"sneakers","tag":"NEW ARRIVAL","description":"Stylish sneakers made with sustainable materials for conscious fashion.","image":"https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop"}];
    } catch {
      return [{"id":"p1","title":"URBAN ESSENTIAL JACKET","displayCategory":"Outerwear","price":120,"imageCategory":"outerwear","tag":"BESTSELLER","description":"Lightweight, durable jacket perfect for any season with a sleek modern fit.","image":"https://images.unsplash.com/photo-1539533018447-63fcce667823?q=80&w=800&auto=format&fit=crop"},{"id":"p2","title":"COMFORT FIT T-SHIRT","displayCategory":"Tops","price":35,"imageCategory":"tops","tag":"NEW ARRIVAL","description":"Soft breathable cotton t-shirt, ideal for everyday comfort and style.","image":"https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=800&auto=format&fit=crop"},{"id":"p3","title":"SLIM CHINO PANTS","displayCategory":"Bottoms","price":60,"imageCategory":"trousers","tag":"BESTSELLER","description":"Tailored chinos with a slim cut, offering both style and versatility.","image":"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop"},{"id":"p4","title":"MINIMALIST LEATHER BACKPACK","displayCategory":"Accessories","price":150,"imageCategory":"bags","tag":"NEW ARRIVAL","description":"Crafted from premium leather, this backpack balances form and function.","image":"https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"},{"id":"p5","title":"CLASSIC DENIM JACKET","displayCategory":"Outerwear","price":110,"imageCategory":"outerwear","tag":"","description":"Timeless denim jacket with a comfortable fit and authentic details.","image":"https://images.unsplash.com/photo-1539533018447-63fcce667823?q=80&w=800&auto=format&fit=crop"},{"id":"p6","title":"ECO-FRIENDLY SNEAKERS","displayCategory":"Footwear","price":80,"imageCategory":"sneakers","tag":"NEW ARRIVAL","description":"Stylish sneakers made with sustainable materials for conscious fashion.","image":"https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop"}];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ditris_products', JSON.stringify(products));
      localStorage.setItem('ditris_brand_owner', currentStoreBrand);
    } catch {}
  }, [products]);

  // Global Dynamic Categories State
  const [categories, setCategories] = useState<any[]>([{"id":"c1","name":"NEW ARRIVALS","description":"NEW ARRIVALS CATEGORY","status":"VISIBLE"},{"id":"c2","name":"TOPS","description":"TOPS CATEGORY","status":"VISIBLE"},{"id":"c3","name":"BOTTOMS","description":"BOTTOMS CATEGORY","status":"VISIBLE"},{"id":"c4","name":"OUTERWEAR","description":"OUTERWEAR CATEGORY","status":"VISIBLE"},{"id":"c5","name":"ACCESSORIES","description":"ACCESSORIES CATEGORY","status":"VISIBLE"}]);

  // Global Dynamic Collections State
  const [collections, setCollections] = useState<any[]>([{"id":"col1","title":"N&S FLAGSHIP CAPSULE","season":"PERMANENT COLLECTION","bannerImage":"https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"},{"id":"col2","title":"N&S EDITION N° 01","season":"CURRENT SEASON","bannerImage":"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"}]);

  // Global Dynamic Orders State with Brand-Match Guard
  const [orders, setOrders] = useState<any[]>(() => {
    try {
      const savedBrand = localStorage.getItem('ditris_brand_owner');
      const savedOrders = localStorage.getItem('ditris_orders');
      if (savedBrand === currentStoreBrand && savedOrders) {
        return JSON.parse(savedOrders);
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ditris_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Global Dynamic Site Content & Banners State with Brand-Match Guard
  const [siteContent, setSiteContent] = useState<any>(() => {
    try {
      const savedBrand = localStorage.getItem('ditris_brand_owner');
      const savedContent = localStorage.getItem('ditris_site_content');
      if (savedBrand === currentStoreBrand && savedContent) {
        const parsed = JSON.parse(savedContent);
        if (parsed?.brandName === currentStoreBrand) {
          return parsed;
        }
      }
      return {"brandName":"N&S","banner1":{"title":"N&S OFFICIAL","subtitle":"CATALOGUE N° 01 / EDITORIAL","image":"https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop","ctaText":"SHOP NOW"},"banner2":{"title":"NEW ARRIVALS","subtitle":"NEW ARRIVALS / SEASON 24","image":"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop","ctaText":"SHOP NOW"},"announcementText":"COMPLIMENTARY WORLDWIDE EXPRESS DELIVERY ON ORDERS OVER $200"};
    } catch {
      return {"brandName":"N&S","banner1":{"title":"N&S OFFICIAL","subtitle":"CATALOGUE N° 01 / EDITORIAL","image":"https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop","ctaText":"SHOP NOW"},"banner2":{"title":"NEW ARRIVALS","subtitle":"NEW ARRIVALS / SEASON 24","image":"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop","ctaText":"SHOP NOW"},"announcementText":"COMPLIMENTARY WORLDWIDE EXPRESS DELIVERY ON ORDERS OVER $200"};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ditris_site_content', JSON.stringify(siteContent));
      localStorage.setItem('ditris_brand_owner', currentStoreBrand);
    } catch {}
  }, [siteContent]);

  // Region & Location Preference State
  const [selectedRegion, setSelectedRegion] = useState({
    country: 'UNITED STATES',
    currency: 'USD ($)',
    code: 'US',
  });

  // Welcome / Location Detect Modal state (AUTO-TRIGGERS ON LOAD)
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(() => {
    try {
      return !sessionStorage.getItem('ditris_region_seen_' + currentStoreBrand);
    } catch {
      return true;
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const handleSignIn = (userData: any) => {
    setUser(userData);
    try {
      localStorage.setItem('ditris_user_session', JSON.stringify(userData));
    } catch {}
  };

  const handleSignOut = () => {
    setUser(null);
    try {
      localStorage.removeItem('ditris_user_session');
    } catch {}
  };

  const handleToggleWishlist = (product: any) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      const idx = prev.findIndex(i => i.id === item.id && i.size === item.size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  // Product CRUD Handlers
  const handleSaveProduct = (productData: any) => {
    setProducts(prev => {
      const idx = prev.findIndex(p => p.id === productData.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...productData };
        return next;
      }
      return [productData, ...prev];
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Category CRUD Handlers
  const handleSaveCategory = (categoryData: any) => {
    setCategories(prev => {
      const idx = prev.findIndex(c => c.id === categoryData.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...categoryData };
        return next;
      }
      return [...prev, categoryData];
    });
  };

  // Collection CRUD Handler
  const handleCreateCollection = (collectionData: any) => {
    setCollections(prev => [collectionData, ...prev]);
  };

  // Order Placement Handler
  const handlePlaceOrder = (orderPayload: any) => {
    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'PROCESSING',
      items: cartItems,
      total: orderPayload.total || cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
      shipping: orderPayload.shipping || {},
    };
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]); // Clear bag after order
  };

  const handleUpdateBanner = (key: 'banner1' | 'banner2', updatedData: any) => {
    setSiteContent((prev: any) => ({
      ...prev,
      [key]: { ...prev[key], ...updatedData },
    }));
  };

  const handleSelectRegion = (region: { country: string; currency: string; code: string }) => {
    setSelectedRegion(region);
    try {
      sessionStorage.setItem('ditris_region_seen_' + currentStoreBrand, 'true');
    } catch {}
  };

  const wishlistIds = wishlistItems.map(i => i.id);

  return (
    <Router>
      <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-black selection:text-white">
        <Navbar
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          user={user}
          isAdminMode={isAdminMode}
          selectedRegion={selectedRegion}
          onSignOut={handleSignOut}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenRegion={() => setIsWelcomeOpen(true)}
        />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  products={products}
                  siteContent={siteContent}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistIds={wishlistIds}
                  isAdminMode={isAdminMode}
                  onUpdateBanner={handleUpdateBanner}
                />
              }
            />
            <Route path="/shop" element={<Shop products={products} categories={categories} />} />
            <Route path="/shop/:category" element={<Shop products={products} categories={categories} />} />
            <Route path="/product/:id" element={<ProductDetails products={products} onAddToCart={handleAddToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/orders" element={<Orders orders={orders} />} />
            <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
            <Route path="/profile" element={<Profile user={user} onSignOut={handleSignOut} />} />
            <Route
              path="/wishlist"
              element={
                <Wishlist
                  wishlistItems={wishlistItems}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout
                  cartItems={cartItems}
                  onPlaceOrder={handlePlaceOrder}
                />
              }
            />
            <Route path="/admin" element={<AdminSignIn setIsAdminMode={setIsAdminMode} />} />
            <Route path="/admin/dashboard" element={<AdminDashboard products={products} orders={orders} />} />
            <Route
              path="/admin/products"
              element={
                <AdminProducts
                  products={products}
                  categories={categories}
                  onDeleteProduct={handleDeleteProduct}
                />
              }
            />
            <Route
              path="/admin/products/new"
              element={
                <AdminProductNew
                  products={products}
                  categories={categories}
                  onAddProduct={handleSaveProduct}
                />
              }
            />
            <Route
              path="/admin/products/:id/edit"
              element={
                <AdminProductNew
                  products={products}
                  categories={categories}
                  onEditProduct={handleSaveProduct}
                />
              }
            />
            <Route
              path="/admin/categories"
              element={
                <AdminCategories
                  categories={categories}
                  onSaveCategory={handleSaveCategory}
                />
              }
            />
            <Route
              path="/admin/collections"
              element={
                <AdminCollections
                  collections={collections}
                  onCreateCollection={handleCreateCollection}
                />
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminOrders
                  orders={orders}
                  setOrders={setOrders}
                />
              }
            />
            <Route
              path="/admin/site-content"
              element={
                <AdminSiteContent
                  siteContent={siteContent}
                  setSiteContent={setSiteContent}
                />
              }
            />
          </Routes>
        </main>

        <Footer isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />

        <SearchOverlay
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        <WelcomeModal
          isOpen={isWelcomeOpen}
          onClose={() => {
            setIsWelcomeOpen(false);
            try { sessionStorage.setItem('ditris_region_seen_' + currentStoreBrand, 'true'); } catch {}
          }}
          selectedRegion={selectedRegion}
          onSelectRegion={handleSelectRegion}
          brandName={siteContent.brandName || 'N&S'}
        />
      </div>
    </Router>
  );
}

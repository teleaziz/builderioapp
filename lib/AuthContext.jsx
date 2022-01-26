import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { supabase } from './supabase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [productData, setProductData] = useState([])
  const [sizeData, setSizeData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [colorData, setColorData] = useState([])
  const [cart, setCart] = useState({
    item: 0,
    product: [],
  })

  const total = cart?.product
    .map((product) => product.price)
    .reduce((a, b) => a + b, 0)

  useEffect(() => {
    fetchProducts()
    fetchColors()
    fetchSizes()
    fetchCategories()
  }, [])

  const value = {
    productData,
    setProductData,
    sizeData,
    setSizeData,
    categoryData,
    setCategoryData,
    colorData,
    setColorData,
    cart,
    setCart,
    total,
  }
  const fetchProducts = async () => {
    let { data: products, error } = await supabase.from('products').select('*')
    if (error) console.log('error', error)
    else {
      setProductData(products)
    }
  }

  const fetchSizes = async () => {
    let { data: size, error } = await supabase.from('size').select('id,size')
    if (error) console.log('error', error)
    else {
      setSizeData(size)
    }
  }

  const fetchColors = async () => {
    let { data: color, error } = await supabase.from('color').select('id,color')
    if (error) console.log('error', error)
    else {
      setColorData(color)
    }
  }
  const fetchCategories = async () => {
    let { data: category, error } = await supabase
      .from('category')
      .select('id,catName')
    if (error) console.log('error', error)
    else {
      setCategoryData(category)
    }
  }

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )
}

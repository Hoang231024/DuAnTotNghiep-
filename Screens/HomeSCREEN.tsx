import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://192.168.1.168:3000/LapTop/getListLapTop')
      .then(response => {
        setLaptops(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách laptop:', error);
        setLaptops([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../acssets/profile1.png')} style={styles.profileImage} />
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Image source={require('../acssets/bell.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Find')}>
            <Image source={require('../acssets/SearchIcon.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CustomDrawerContent')}>
            <Image source={require('../acssets/Menu.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        <Text style={[styles.category, styles.categoryActive]}>Popular</Text>
        <Text style={styles.category}>Trending</Text>
        <Text style={styles.category}>News</Text>
        <Text style={styles.category}>Sale</Text>
      </View>

      {/* Product List */}
      <ScrollView style={styles.productScrollView}>
        <View style={styles.productList}>
          {laptops.map((laptop) => (
            <View style={styles.product} key={laptop._id}>
              <TouchableOpacity onPress={() => navigation.navigate('ProductScreen', { laptop })}>
                <Image source={{ uri: laptop.Img }} style={styles.productImage} />
                <Text style={styles.productName}>{laptop.TenSP}</Text>
                <Text style={styles.productPrice}>${laptop.Gia} USD</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.heartIconContainer}>
                <Image source={require('../acssets/Vector.png')} style={styles.heartIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  profileImage: { width: 40, height: 40, borderRadius: 20 },
  headerIcons: { flexDirection: 'row' },
  icon: { width: 24, height: 24, marginLeft: 16 },
  categories: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16 },
  category: { fontSize: 16, fontWeight: 'bold', color: '#999' },
  categoryActive: { color: '#6C63FF', borderBottomWidth: 2, borderBottomColor: '#6C63FF' },
  productScrollView: { paddingVertical: 16 },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  product: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    width: '47%',
    padding: 16,
    marginBottom: 16,
  },
  productImage: { width: 100, height: 100, resizeMode: 'contain' },
  productName: { fontSize: 16, fontWeight: 'bold', marginTop: 10, textAlign: 'center' },
  productPrice: { fontSize: 14, color: '#888', marginTop: 5 },
  heartIconContainer: { position: 'absolute', top: 10, right: 10 },
  heartIcon: { width: 20, height: 20 },
});

export default HomeScreen;

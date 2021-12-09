import { collection, getDocs, orderBy, query, where } from '@firebase/firestore';
import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { SearchBar } from 'react-native-elements';
import { useEffect, useState } from 'react/cjs/react.development';
import SpotPreview from '../components/SpotPreview';
import { firestore } from '../Firebase'
import Fuse from 'fuse.js';

export default function Home({navigation}) {
    const [posts, setPosts] = useState([]);

    //Search field states
    const [searchTerm, setSearchTerm] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    // filter state
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {label: 'All', value: 'All'},
        {label: 'Park', value: 'Park'},
        {label: 'Street', value: 'Street'},
        {label: 'Hybrid', value: 'Hybrid'}
    ]);
    const [filterVal, setFilterVal] = useState("All");

    // DATABASE REF
    const dbRef = collection(firestore, 'posts');
    // get snapshot of posts in order of timestamp descending
    useEffect(async () => {
        // if statements with category state (all, park, street, hybrid) and if searchTerm is something then where()
        await setPosts(null);

        if (filterVal === 'All') {
                const querySnapshot = await getDocs(query(dbRef, orderBy('uploadTime')));
                await setPosts(querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
        }

        if (filterVal === 'Park') {
                const querySnapshot = await getDocs(query(dbRef, where("category", "==", filterVal), orderBy('uploadTime')));
                await setPosts(querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
                console.log("havd nu" + posts.length)
        }

        if (filterVal === 'Street') {
                const querySnapshot = await getDocs(query(dbRef, where("category", "==", filterVal), orderBy('uploadTime')));
                await setPosts(querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
        }

        if (filterVal === 'Hybrid') {
                try {
                    const querySnapshot = await getDocs(query(dbRef, where("category", "==", filterVal), orderBy('uploadTime')));
                    await setPosts(querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
                } catch (e) {
                    console.log(e)
                }
        }

        // SEARCH RESULTS
        const fuse = new Fuse(posts, {threshold: 0.4, keys: ['category', 'title', 'location']})
        const results = fuse.search(searchTerm).map(({ item }) => item);

        if (searchTerm) {
            await setPosts(results);
        }

        
    }, [filterVal, searchTerm])
    

    return (
        <View style={styles.container}>
            {/* search field and filter*/}
            <View>
                <SearchBar 
                    lightTheme
                    searchIcon={{ size: 24 }}
                    onChangeText={text => setSearchTerm(text)}
                    onClear={text => setSearchTerm('')}
                    placeholder="Type Here..."
                    value={searchTerm}
                />
                
                <View style={{marginHorizontal: 10}}>
                    <Text style={{fontSize: 16, fontWeight: "bold", marginTop: 10}}>Category:</Text>
                    <DropDownPicker 
                        open={open}
                        value={filterVal}
                        items={items}
                        setOpen={setOpen}
                        setValue={setFilterVal}
                        setItems={setItems}
                    />
                </View>
            </View>

            {/* map data and render the template */}
            {posts ?
                <ScrollView>
                    {posts.map((post) => (
                        <SpotPreview key={post.id} title={post.title} category={post.category} location={post.location} image={post.image} id={post.id} navigation={navigation} />
                    ))}
                </ScrollView> 
                
                : 
                
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                    <Text>No result could be found</Text>
                </View>
                
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

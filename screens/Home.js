import { collection } from '@firebase/firestore';
import React from 'react'
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { SearchBar } from 'react-native-elements';
import { useEffect, useState } from 'react/cjs/react.development';
import SpotPreview from '../components/SpotPreview';
import { firestore } from '../Firebase'
import Fuse from 'fuse.js';
import { connect } from 'react-redux'


function Home(props) {
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

    
    useEffect(async() => {
        
        if (filterVal === 'Park' || filterVal === 'Street' || filterVal === 'Hybrid') {

            setPosts(props.feed.filter(x => x.category == filterVal));
            
        } else {
            setPosts(props.feed);
        }

        // SEARCH RESULTS
        const fuse = new Fuse(posts, {threshold: 0.4, keys: ['category', 'title', 'location']})
        const results = fuse.search(searchTerm).map(({ item }) => item);

        if (searchTerm) {
            await setPosts(results);
        }

        

    }, [props.feed, filterVal, searchTerm, props.navigation])

    const renderLoader = () => {
        return (
            <View>
                <ActivityIndicator size='large' color='#aaa' style={{marginVertical: 16, alignItems: 'center'}} />
            </View>
        )
    }
    const loadMoreItem = () => {
        console.log('loading more')
    }
    

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

            {posts ?
                <FlatList 
                    data={posts}
                    renderItem={({ item }) => (
                        <SpotPreview post={item} navigation={props.navigation} />
                    )}
                    
                    ListFooterComponent={posts.length > 3 ? renderLoader : null}
                    onEndReached={posts.length > 3 ? loadMoreItem : null}
                    onEndReachedThreshold={0}
                    
                />
                
                : 
                
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                    <Text>No result could be found</Text>
                </View>
                
            }
            
        </View>
    )
}

const mapStateToProps = (store) => ({
    feed: store.usersState.feed,
})

export default connect(mapStateToProps, null)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

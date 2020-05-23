import React from "react";
import { View , StyleSheet , FlatList , Image} from "react-native";
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import Moment from 'moment';

class Main extends React.Component
{
    constructor()
    {
        super();
        this.state={
            games:[],
            error:false,
        }
    }


    componentDidMount = ()=>
    {
        fetch('https://api.crackwatch.com/api/games?page=0&sort_by=crack_date&is_cracked=true',{
            method:"GET"
        })
        .then(res=>res.json())
        .then((res)=>{
            console.log(res);
            this.setState({
                games:res
            })
            if(res.message)
            {
                this.setState({
                    error:true
                })
            }
        })
    }

    render ()
    {
        Moment.locale('en');

        if(this.state.error)
        {
            return(
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize:25,color:"gray"}}>
                       Error Connecteing To Server
                    </Text>
                    <Text style={{fontSize:18,color:"gray"}}>
                      Try Later
                    </Text>
                </View>
            )
        }

        return(
            <Container>
            <Header 
            style={{
                backgroundColor:"#000"
            }}
            androidStatusBarColor={"#000"}
            >
                <Body style={{flex:1,justifyContent:'center',alignItems:"center"}}>
                    <Text style={{fontSize:20 , color:"#fff" }}>
                        Game Watcher 
                    </Text>
                    <Text style={{fontSize:12 , color:"#da1106" }}>
                        Using Crackwatch Api
                    </Text>
                </Body>
             </Header>   
            <Content>
              <Text
              style={{
                  fontSize:18,
                  margin:"5%",
                  color:"gray",
              }}
              >
                Latest Cracked Games
             </Text>  
            <FlatList
                data={this.state.games}
                renderItem={({ item }) => {
                    return (
                        <Card>
                        <CardItem>
                          <Body style={{flex:1,flexDirection:"row",flexWrap:"wrap"}}>
                            <Image style={{height:65,width:65,margin:"2%"}} source={{uri:item.imagePoster}} />
                            <View style={{marginLeft:"2%"}}>
                            <Text style={{fontSize:12}}>
                             Name: {item.title}
                            </Text>
                            <Text style={{fontSize:12}}>
                            Release Date : {Moment(item.releaseDate).format('d MMM YY')} 
                            </Text>
                            <Text style={{fontSize:12}}>
                            Protection : {item.protections[0].toLowerCase()}
                            </Text>
                            <Text style={{fontSize:12}}>
                            Group : {item.groups[0].toLowerCase()}
                            </Text>

                            </View>
                          </Body>
                        </CardItem>
                      </Card>
                    )
                } }
                keyExtractor={item => item._id}
                />
              
            </Content>
          </Container>
    
           
        )
    }
}


export default Main;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
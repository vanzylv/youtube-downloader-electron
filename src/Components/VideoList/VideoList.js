import React, { Component } from 'react';
import VideoCard from '../VideoCard/VideoCard';
import Grid from 'material-ui/Grid';
import SearchResults from '../../DummyData/SearchResults';
import VideoIcon from 'material-ui-icons/OndemandVideo';


class VideoList extends Component {
    render() {

        let noResults = null;
        
        const cardList = SearchResults.items.map((item, i) => {
            return (
                <Grid item key={i}>
                    <VideoCard openPreviewDialog={this.props.openPreviewDialog}  videoInfo={item} />
                </Grid>
                )
        });

        if(cardList.length ===0){
            noResults =  <VideoIcon  color="disabled" style={{paddingTop:100, fontSize:500}}/>;
        }

        console.log(cardList);

        return (
            <Grid style={{justifyContent:'center'}}  spacing={24} container>
                {cardList}
                {noResults}
            </Grid>
        );
    }
}

export default VideoList;
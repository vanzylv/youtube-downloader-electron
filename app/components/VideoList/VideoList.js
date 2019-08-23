import React, { Component } from 'react';
import VideoCard from '../VideoCard/VideoCard';
import Grid from '@material-ui/core/Grid';
import VideoIcon from '@material-ui/icons/PlayCircleOutline';

class VideoList extends Component {
    
  render() {
    let noResults = null;
        
    const cardList = this.props.videos.map((item, i) => {
      return (
        <Grid item key={i}>
          <VideoCard openPreviewDialog={this.props.openPreviewDialog}  videoInfo={item} />
        </Grid>
      );
    });
        
    if(cardList.length ===0){
      noResults =  <VideoIcon  color="primary" style={{paddingTop:150, fontSize:300}}/>;
    }

    return (
      <Grid style={{justifyContent:'center'}}  spacing={24} container>
        {cardList}
        {noResults}
      </Grid>
    );
  }
}

export default VideoList;
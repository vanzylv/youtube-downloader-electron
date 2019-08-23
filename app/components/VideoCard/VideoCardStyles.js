const styles = theme => ({
  card: {
    maxWidth: 350,
    width:350,
    height:480
  },
  cardHeader: {
    height: 80,
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  descriptionBlock: {
    height: 100
  },
  cardHeaderText: {
    color: 'white'
  },
  media: {
    height: 180,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
    
});

export default styles; 

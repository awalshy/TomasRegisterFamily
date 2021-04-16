import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, makeStyles, Typography } from "@material-ui/core"

const IndexPage = () => {
  const router = useRouter()
  const classes = useStyles()
  
  const [hover, setHover] = useState(false)

  return (
    <div
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh'
      }}
    >
      <div
        className={classes.bg}
      >
        <Typography variant="h1" color="primary">
          TOMAS
        </Typography>
        <Typography variant="h6" color="secondary">
          La tablette pour Séniors - Création du compte famille
        </Typography>
      </div>
      <div className={classes.button}>
        <Button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          color={hover ? 'secondary' : 'default'}
          variant="contained"
          onClick={() => router.push('Register')}
        >Register</Button>
      </div>
    </div>
  )
}

const useStyles = makeStyles(_theme => ({
  bg: {
    marginLeft: '5vw',
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    justifyContent: 'center'
  },
  button: {
    position: 'absolute',
    bottom: '10vh',
    display: 'flex',
    width: '100vw',
    justifyContent: 'center'
  }
}))

export default IndexPage
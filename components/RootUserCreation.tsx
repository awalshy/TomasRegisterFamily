import { Divider, makeStyles, TextField, Typography, Button } from '@material-ui/core'
import firebase from 'firebase'
import React, { useState } from 'react'

type RUCProps = {
  handleBack: () => void,
  handleNext: () => void
}

const RootUserCreation = (
  {
    handleBack,
    handleNext
  }: RUCProps
) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const classes = useStyles()
  const moveNext = async () => {
    const auth = firebase.auth()
    const firestore = firebase.firestore()

    try {
      // register user
      const user = await auth.createUserWithEmailAndPassword(email, password)
      if (!user || !user.user) throw Error('Failed to register user')
      // save user details
      await firestore.collection('users').doc(user.user.uid).set({
        family: '',
        lastName,
        firstName,
      })
      handleNext()
    } catch(e) {
      console.error(e.message)
    }
  }

  return (
    <div className={classes.container}>
      <form>
        <Typography
          variant="h4"
        >
          Création de l'utilisateur principal
        </Typography>
        <Divider />
        <div className={classes.space}></div>
        <div className={classes.fields}>
          <TextField
            value={firstName}
            className={classes.input}
            onChange={e => setFirstName(e.target.value)}
            id="firstname"
            placeholder="Prénom"
          />
          <TextField
            value={lastName}
            className={classes.input}
            onChange={e => setLastName(e.target.value)}
            id="lastname"
            placeholder="Nom de Famille"
          />
          <TextField
            value={email}
            className={classes.input}
            onChange={e => setEmail(e.target.value)}
            id="email"
            placeholder="Email"
          />
          <TextField
            value={password}
            className={classes.input}
            onChange={e => setPassword(e.target.value)}
            id="password"
            placeholder="Mot de Passe"
            type="password"
          />
        </div>
      </form>
      <div>
          <Button disabled onClick={handleBack} className={classes.button}>
            Retour
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={moveNext}
            className={classes.button}
          >
            Suivant
          </Button>
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    paddingLeft: '5vw'
  },
  button: {
    marginRight: theme.spacing(1),
  },
  space: {
    marginTop: '4vh',
    marginBottom: '4vh'
  },
  fields: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    marginBottom: '2vh',
    width: '80%'
  },
  formActions: {
    display: 'flex',
    flexDirection: 'row'
  }
}))

export default RootUserCreation
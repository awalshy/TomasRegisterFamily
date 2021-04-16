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
    <div>
      <div className={classes.row}>
        <div className={classes.half}>
          <form className={classes.container} onSubmit={moveNext}>
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
        </div>
        <div className={classes.half}>
          <img src="/signIn.svg" width="65%" />
        </div>
      </div>
      <div className={classes.formActions}>
          <Button
            variant="contained"
            color="primary"
            onClick={moveNext}
            className={classes.button}
          >
            Suivant
          </Button>
          <Button disabled onClick={handleBack} className={classes.button}>
            Retour
          </Button>
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    paddingLeft: '5vw'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    paddingLeft: '5vw',
    paddingRight: '5vw',
    marginBottom: '5vh',
    overflowX: 'hidden',
  },
  half: {
    width: '50%'
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
    flexDirection: 'row-reverse',
    marginRight: '3vw'
  }
}))

export default RootUserCreation
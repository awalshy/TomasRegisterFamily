import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import sha1 from 'sha1'
import { Skeleton } from '@material-ui/lab'
import { Typography, makeStyles, Button } from '@material-ui/core'

type FCCProps = {
  handleBack: () => void,
  handleNext: () => void
}

const FamilyCreation = ({
  handleBack,
  handleNext
}: FCCProps) => {
  const firestore = firebase.firestore()
  const auth = firebase.auth()
  const classes = useStyles()

  const [family, setFamily] = useState('')
  const [famCode, setFamCode] = useState('')
  const [loaded, setLoaded] = useState(false)

  const [userRef, setUserRef] = useState<firebase.firestore.DocumentReference>()

  useEffect(() => {
    (async () => {
      if (!auth.currentUser) {
        console.error('pb')
        return
      }
      const uid = auth.currentUser.uid
      const tUserRef = firestore.collection('users').doc(uid)
      setUserRef(tUserRef);
      const userDetails = await tUserRef.get()
      if (!userDetails) return
      const lastName = userDetails.get('lastName') as string
      setFamily(lastName.toUpperCase())
      setLoaded(true)
      const code = sha1(family + Date.now().toString()).slice(0, 9).toUpperCase()
      setFamCode(code)
    })()
  }, [])

  const saveFamily = async () => {
    try {
      const familyRef = await firestore.collection('families').add({
        code: famCode,
        name: family,
        members: [userRef]
      })
      if (familyRef && userRef) {
        await userRef.update({
          family: familyRef
        })
        handleNext()
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  return (
    <div>
      {!loaded &&
        <div className={classes.loadContainer}>
          <Skeleton animation="wave" variant="text" />
        </div>
      }
      {loaded &&
        <div className={classes.container}>
          <div>
            <Typography>Family: {family}</Typography>
            <Typography>Code: {famCode}</Typography>
          </div>
          <div>
            <Button disabled onClick={handleBack} className={classes.button}>
              Retour
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={saveFamily}
              className={classes.button}
            >
              Confirmer
            </Button>
          </div>
        </div>
      }
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  loadContainer: {
    width: '80vw'
  },
  container: {
    marginLeft: '5vw'
  },
  button: {
    marginRight: theme.spacing(1)
  }
}))

export default FamilyCreation
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
  const [loaded, setLoaded] = useState(true)

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
    handleNext()
  }

  return (
    <div>
      {!loaded &&
        <div className={classes.loadContainer}>
          <Skeleton animation="wave" variant="text" />
        </div>
      }
      {loaded &&
        <div>
          <div className={classes.row}>
            <div className={classes.half}>
              <img
                src="/logo_head.svg"
                width="25%"
              />
            </div>
            <div className={classes.halfRight}>
              <Typography variant="h4" color="primary">Le compte et la famille ont été créé avec succès !</Typography>
              <Typography variant="h6" color="secondary">Famille {family}</Typography>
              <br />
              <Typography>
                Vous pouvez désormais vous connecter sur l'application TOMAS Family App et vous connecter avec ce compte !
                Vous pouvez également transmettre le code famille ci-dessous afin que les autres membres de la famille pour qu'ils puissent la rejoindre !
              </Typography>
              <Typography variant="h4" color="secondary">Code à entrer: {famCode}</Typography>
            </div>
          </div>
          <div className={classes.formActions}>
            <Button
              variant="contained"
              color="primary"
              onClick={saveFamily}
              className={classes.button}
            >
              Terminer
            </Button>
            <Button disabled onClick={handleBack} className={classes.button}>
              Retour
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
  row: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '5vh'
  },
  half: {
    width: '40%',
    display: 'flex',
    justifyContent: 'center'
  },
  halfRight: {
    width: '60%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  formActions: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginRight: '3vw'
  }
}))

export default FamilyCreation
import React, { useState } from 'react'
import {
  makeStyles,
  Button,
  Typography,
  TextField,
  CircularProgress
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

type PProps = {
  handleBack: () => void,
  handleNext: () => void
}

const Paiment = ({
  handleNext,
  handleBack
}: PProps) => {
  const classes = useStyles()

  const [validPaiment, setValidPaiment] = useState(false)
  const [redirection, setRedirection] = useState(false)
  const [loading, setLoading] = useState(false)

  const moveNext = () => {
    setLoading(true)
    setTimeout(() => setValidPaiment(true), 2000)
    setTimeout(() => setRedirection(true), 1000)
  }

  return (
    <div>
      <div className={classes.row}>
        <div className={classes.half}>
          <img
            src="/paiment.svg"
            width="30%"
          />
        </div>
        <div className={classes.halfRight}>
          {validPaiment &&
            <div className={classes.valid}>
              <CheckCircleIcon style={{ color: '#219A05', fontSize: '6rem', textAlign: 'center' }} />
              <Typography variant="h3" color="primary">
                Et c'est gagné !!
              </Typography>
              {redirection && <Typography>
                Redirection...
              </Typography>}
            </div>
          }
          {!validPaiment &&
            <div>
              <TextField
                placeholder="1234 XXXX XXXX XXXX"
              />
              <Button
                onClick={moveNext}
                variant="contained"
                color="secondary"
              >
                {loading ? <CircularProgress /> : 'Payer'}
              </Button>
            </div>
          }
        </div>
      </div>
      <div className={classes.formActions}>
          <Button
            disabled={!validPaiment}
            variant="contained"
            color="primary"
            onClick={() => handleNext()}
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
  row: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '5vh'
  },
  valid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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

export default Paiment
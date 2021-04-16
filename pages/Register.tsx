import React, { useState, useEffect } from 'react'
import {
  Stepper,
  makeStyles,
  Step,
  StepLabel,
  Typography,
} from '@material-ui/core'
import { Done } from '@material-ui/icons'

import { initFirebase } from '../components/firebase'
import Layout from '../components/Layout'
import FamilyCreation from '../components/FamilyCreation'
import RootUserCreation from '../components/RootUserCreation'
import Paiment from '../components/Paiment'

const Register = () => {
  const classes = useStyles()
  const [actStep, setCurrentStep] = useState(0)

  useEffect(() => initFirebase(), [])

  const steps = [
    'Création du Compte',
    'Paiement',
    'Récapitulatif',
  ]
  const handleNext = () => setCurrentStep((prevActiveStep) => prevActiveStep + 1)
  const handleBack = () => setCurrentStep(prev => prev - 1)
  const getStepContent = (num: number) => {
    switch (num) {
      case 0: return <RootUserCreation handleNext={handleNext} handleBack={handleBack} />
      case 1: return <Paiment handleNext={handleNext} handleBack={handleBack} />
      case 2: return <FamilyCreation handleNext={handleNext} handleBack={handleBack} />
    }
  }

  return (
    <Layout title="TOMAS Inscription de la famille">
      <Stepper activeStep={actStep}>
        {steps.map((label, _index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div style={{ marginTop: '6vh' }}>
        {actStep === steps.length ? (
          <div className={classes.recap}>
            <Done color="secondary" style={{ fontSize: '5rem' }} />
            <div style={{ marginLeft: '3vw' }}>
              <Typography variant="h4" color="primary">
                Merci d'avoir inscrit votre famille !
              </Typography>
              <Typography className={classes.instructions} color="primary">
                Vous recevrez bientôt un mail recapitulatif.
              </Typography>
            </div>
          </div>
        ) : (
          <div>{getStepContent(actStep)}</div>
        )}
      </div>
    </Layout>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  recap: {
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

export default Register
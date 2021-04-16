import { makeStyles, Stepper, Step, StepLabel, Typography, Button } from '@material-ui/core'
import { useState, useEffect } from 'react'
import FamilyCreation from '../components/FamilyCreation'
import Layout from '../components/Layout'
import RootUserCreation from '../components/RootUserCreation'
import { initFirebase } from '../components/firebase'

const IndexPage = () => {
  const classes = useStyles()
  const [actStep, setCurrentStep] = useState(0)

  useEffect(() => initFirebase(), [])

  const steps = [
    'Création du Compte',
    'Création de la Famille',
    'Paiement et Récup'
  ]
  const handleNext = () => setCurrentStep((prevActiveStep) => prevActiveStep + 1)
  const handleReset = () => setCurrentStep(0)
  const handleBack = () => setCurrentStep(prev => prev - 1)
  const getStepContent = (num: number) => {
    switch (num) {
      case 0: return <RootUserCreation handleNext={handleNext} handleBack={handleBack} />
      case 1: return <FamilyCreation handleNext={handleNext} handleBack={handleBack} />
      case 2: return 'Paiment + récaputilatif'
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
      <div>
        {actStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Vous recevrez bientôt un mail recapitulatif.
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Annuler
            </Button>
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
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

export default IndexPage

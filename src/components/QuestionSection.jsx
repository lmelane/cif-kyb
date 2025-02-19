import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  FormGroup,
  TextField,
  Grid,
  Paper,
  Box,
  Slider,
  InputAdornment,
  Tooltip,
  InfoIcon,
  Alert,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
  question: {
    marginBottom: theme.spacing(2),
  },
  questionLabel: {
    fontWeight: 500,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
  },
  questionText: {
    marginBottom: theme.spacing(2),
    fontWeight: 500,
  },
  radioGroup: {
    marginTop: theme.spacing(1),
  },
  checkboxGroup: {
    marginTop: theme.spacing(1),
  },
  numberInput: {
    width: '100%',
    maxWidth: 200,
  },
  footnote: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    fontStyle: 'italic',
  },
  sliderContainer: {
    padding: theme.spacing(2, 1),
  },
  slider: {
    '& .MuiSlider-rail': {
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.palette.grey[300],
    },
    '& .MuiSlider-track': {
      height: 8,
      borderRadius: 4,
    },
    '& .MuiSlider-thumb': {
      width: 24,
      height: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0px 0px 0px 8px ${theme.palette.primary.main}`,
      },
    },
    '& .MuiSlider-valueLabel': {
      fontSize: 14,
      fontWeight: 'normal',
      top: -22,
      backgroundColor: 'unset',
      '&:before': { display: 'none' },
      '& *': {
        background: 'transparent',
      },
    },
    '& .MuiSlider-mark': {
      backgroundColor: theme.palette.grey[500],
      height: 2,
      width: 2,
      borderRadius: 1,
    },
    '& .MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
    '& .MuiSlider-markLabel': {
      fontSize: 12,
      color: theme.palette.text.secondary,
    },
  },
  amountField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused': {
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  infoIcon: {
    fontSize: 16,
    marginLeft: theme.spacing(1),
  },
}));

const QuestionSection = ({ section, formData, onFormDataChange, errors = {} }) => {
  const classes = useStyles();

  // Vérification que section est défini
  if (!section) {
    console.warn('QuestionSection: Section non définie');
    return null;
  }

  // Si la section a une condition, vérifier si elle doit être affichée
  if (section.conditional) {
    const { dependsOn, showWhen } = section.conditional;
    const currentValue = formData[dependsOn];
    
    // Si showWhen est un tableau, vérifier si la valeur actuelle est dans le tableau
    if (Array.isArray(showWhen)) {
      if (!showWhen.includes(currentValue)) {
        return null;
      }
    } 
    // Si showWhen est une valeur unique, faire une comparaison directe
    else if (currentValue !== showWhen) {
      return null;
    }
  }

  // Vérification que la section a des questions
  if (!section.questions || !Array.isArray(section.questions)) {
    console.warn('QuestionSection: Questions non définies ou invalides', section);
    return null;
  }

  const handleChange = (questionId, value) => {
    onFormDataChange({
      ...formData,
      [questionId]: value,
    });
  };

  const renderQuestion = (question) => {
    if (!question || !question.id || !question.type) {
      console.warn('QuestionSection: Question invalide', question);
      return null;
    }

    const error = errors[question.id];

    switch (question.type) {
      case 'radio':
        return (
          <Box key={question.id} className={classes.question}>
            <Typography className={classes.questionLabel}>{question.text}</Typography>
            <FormControl component="fieldset" error={!!error}>
              <RadioGroup
                value={formData[question.id] || ''}
                onChange={(e) => handleChange(question.id, e.target.value)}
                className={classes.radioGroup}
              >
                {question.options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
              {error && (
                <Typography color="error" variant="caption">
                  {error}
                </Typography>
              )}
              {question.footnote && (
                <Typography className={classes.footnote}>{question.footnote}</Typography>
              )}
            </FormControl>
          </Box>
        );

      case 'checkbox':
        return (
          <Box key={question.id} className={classes.question}>
            <Typography className={classes.questionLabel}>{question.text}</Typography>
            <FormControl component="fieldset" error={!!error}>
              <FormGroup className={classes.checkboxGroup}>
                {question.options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        checked={formData[question.id]?.[option.value] || false}
                        onChange={(e) =>
                          handleChange(question.id, {
                            ...formData[question.id],
                            [option.value]: e.target.checked,
                          })
                        }
                      />
                    }
                    label={option.label}
                  />
                ))}
              </FormGroup>
              {error && (
                <Typography color="error" variant="caption">
                  {error}
                </Typography>
              )}
            </FormControl>
          </Box>
        );

      case 'number':
        return (
          <Box key={question.id} className={classes.question}>
            <Typography className={classes.questionLabel}>{question.text}</Typography>
            <TextField
              type="number"
              value={formData[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              error={!!error}
              helperText={error}
              className={classes.numberInput}
              InputProps={{
                endAdornment: question.unit && (
                  <InputAdornment position="end">{question.unit}</InputAdornment>
                ),
              }}
            />
            {question.footnote && (
              <Typography className={classes.footnote}>{question.footnote}</Typography>
            )}
          </Box>
        );

      case 'currency':
        return (
          <Box key={question.id} className={classes.question}>
            <Typography className={classes.questionLabel}>{question.text}</Typography>
            <TextField
              type="number"
              value={formData[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              error={!!error}
              helperText={error}
              className={classes.numberInput}
              InputProps={{
                startAdornment: <InputAdornment position="start">€</InputAdornment>,
              }}
            />
            {question.footnote && (
              <Typography className={classes.footnote}>{question.footnote}</Typography>
            )}
          </Box>
        );

      case 'slider':
        return (
          <Box key={question.id} className={classes.question}>
            <Typography className={classes.questionLabel}>{question.text}</Typography>
            <Box className={classes.sliderContainer}>
              <Slider
                value={formData[question.id] || question.min}
                onChange={(_, value) => handleChange(question.id, value)}
                min={question.min}
                max={question.max}
                step={question.step}
                marks={question.marks}
                valueLabelDisplay="auto"
                className={classes.slider}
              />
            </Box>
            {error && (
              <Typography color="error" variant="caption">
                {error}
              </Typography>
            )}
          </Box>
        );

      case 'combined':
        const value = formData[question.id] || question.components?.[0]?.min || 0;
        const isNegative = Number(value) < 0;
        const isNetIncome = question.id === 'netIncome';

        return (
          <Box>
            <Typography className={classes.questionLabel}>
              {question.text}
            </Typography>
            <Typography variant="subtitle1" gutterBottom color="textSecondary">
              {question.label}
            </Typography>
            {isNetIncome && isNegative && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                Attention : Vous renseignez un résultat net négatif, ce qui indique une perte pour l'entreprise.
              </Alert>
            )}
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <Box className={classes.sliderContainer}>
                  <Slider
                    value={Number(value) || question.components[0].min}
                    onChange={(e, newValue) => handleChange(question.id, newValue)}
                    {...question.components[0]}
                    className={classes.slider}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  value={value}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  {...question.components[1]}
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="end">€</InputAdornment>,
                    sx: isNegative ? { 
                      '& input': { color: '#d32f2f' }
                    } : {}
                  }}
                  className={classes.amountField}
                />
              </Grid>
            </Grid>
          </Box>
        );

      default:
        console.warn(`Type de question non supporté: ${question.type}`);
        return null;
    }
  };

  return (
    <Paper className={classes.paper}>
      {section.questions.map(renderQuestion)}
    </Paper>
  );
};

QuestionSection.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['radio', 'checkbox', 'number', 'currency', 'slider', 'combined']).isRequired,
      })
    ).isRequired,
    conditional: PropTypes.shape({
      dependsOn: PropTypes.string.isRequired,
      showWhen: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
    }),
  }).isRequired,
  formData: PropTypes.object.isRequired,
  onFormDataChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default QuestionSection;

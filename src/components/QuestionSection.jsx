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
    padding: theme.spacing(2, 3),
    '& .MuiSlider-root': {
      width: '100%',
      marginTop: theme.spacing(2),
    },
    '& .MuiSlider-mark': {
      height: 8,
    },
    '& .MuiSlider-markLabel': {
      fontSize: '0.875rem',
      marginTop: theme.spacing(1),
    },
    '& .MuiSlider-valueLabel': {
      fontSize: '0.875rem',
    },
    '& .MuiSlider-rail': {
      height: 4,
    },
    '& .MuiSlider-track': {
      height: 4,
    },
  },
  amountField: {
    '& .MuiInputBase-input': {
      textAlign: 'right',
    },
  },
  combined: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const QuestionSection = ({ section, formData, onFormDataChange, errors = {} }) => {
  const classes = useStyles();

  if (!section || !section.questions) {
    return null;
  }

  const handleChange = (questionId, value) => {
    onFormDataChange({
      ...formData,
      [questionId]: value,
    });
  };

  const renderQuestion = (question) => {
    if (!question) return null;

    switch (question.type) {
      case 'radio':
        return (
          <Box key={question.id}>
            <Typography className={classes.questionLabel}>
              {question.text}
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={formData[question.id] || ''}
                onChange={(e) => handleChange(question.id, e.target.value)}
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
            </FormControl>
            {question.footnote && (
              <Typography variant="caption" className={classes.footnote}>
                {question.footnote}
              </Typography>
            )}
          </Box>
        );

      case 'checkbox':
        return (
          <Box key={question.id}>
            <Typography className={classes.questionLabel}>
              {question.text}
            </Typography>
            <FormGroup>
              {question.options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={formData[question.id]?.includes(option.value) || false}
                      onChange={(e) => {
                        const currentValues = formData[question.id] || [];
                        const newValues = e.target.checked
                          ? [...currentValues, option.value]
                          : currentValues.filter((v) => v !== option.value);
                        handleChange(question.id, newValues);
                      }}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
          </Box>
        );

      case 'number':
        return (
          <Box key={question.id}>
            <Typography className={classes.questionLabel}>
              {question.text}
            </Typography>
            <TextField
              type="number"
              value={formData[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              error={!!errors[question.id]}
              helperText={errors[question.id]}
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
          <Box key={question.id}>
            <Typography className={classes.questionLabel}>
              {question.text}
            </Typography>
            <TextField
              type="number"
              value={formData[question.id] || ''}
              onChange={(e) => handleChange(question.id, e.target.value)}
              error={!!errors[question.id]}
              helperText={errors[question.id]}
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
          <Box key={question.id}>
            <Typography className={classes.questionLabel}>
              {question.text}
            </Typography>
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
            {errors[question.id] && (
              <Typography color="error" variant="caption">
                {errors[question.id]}
              </Typography>
            )}
          </Box>
        );

      case 'combined':
        const value = formData[question.id] !== undefined ? formData[question.id] : 0;
        const isNegative = Number(value) < 0;
        const isNetIncome = question.id === 'netIncome';

        return (
          <Box key={question.id} className={classes.combined}>
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
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={8}>
                <Box className={classes.sliderContainer}>
                  <Slider
                    value={Number(value)}
                    onChange={(e, newValue) => handleChange(question.id, newValue)}
                    min={question.components[0].min}
                    max={question.components[0].max}
                    step={question.components[0].step}
                    marks={question.components[0].marks}
                    valueLabelDisplay="auto"
                    sx={{
                      '& .MuiSlider-track': {
                        backgroundColor: isNegative ? '#d32f2f' : '#2e7d32',
                        height: 4,
                      },
                      '& .MuiSlider-thumb': {
                        backgroundColor: isNegative ? '#d32f2f' : '#2e7d32',
                        '&:hover, &.Mui-focusVisible': {
                          boxShadow: isNegative 
                            ? '0 0 0 8px rgba(211, 47, 47, 0.16)'
                            : '0 0 0 8px rgba(46, 125, 50, 0.16)',
                        },
                      },
                      '& .MuiSlider-rail': {
                        height: 4,
                      },
                      '& .MuiSlider-markLabel': {
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      },
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  value={value}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  inputProps={{
                    min: question.components[1].min,
                    max: question.components[1].max,
                    step: question.components[1].step
                  }}
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="end">€</InputAdornment>,
                    sx: {
                      '& input': {
                        color: isNegative ? '#d32f2f' : 'inherit',
                        textAlign: 'right',
                        paddingRight: '8px',
                      },
                    },
                  }}
                  className={classes.amountField}
                />
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Paper elevation={0} className={classes.paper}>
      {section.questions.map((question) => (
        <Box key={question.id}>
          {renderQuestion(question)}
        </Box>
      ))}
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

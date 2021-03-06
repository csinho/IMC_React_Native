import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


export default class App extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    peso: "",
    altura: "",
    result: false,
    imc: "",
    classificacao: "",
    grauObsidade: ""
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.welcome}>Calculo de IMC</Text>
          <Text style={styles.label}>Altura</Text>
          <TextInput
            style={styles.input}
            keyboardType={'numeric'}
            placeholder="Altura (ex.: 1,70)"
            onChangeText={altura => this.setState({ altura })}
            value={this.state.altura} />

          <Text style={styles.label}>Peso</Text>
          <TextInput
            style={styles.input}
            keyboardType={'numeric'}
            placeholder="Peso (ex.: 75)"
            onChangeText={peso => this.setState({ peso })}
            value={this.state.peso} />

          <TouchableOpacity onPress={this.onSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>

        </View>
        {this.state.result && (
          <View>
            <Text style={styles.resultTitulo}>IMC: {this.state.imc}</Text>
            <Text style={styles.resultDescricao}>
              Sua classificação foi: {this.state.classificacao}
            </Text>
            <Text style={styles.resultDescricao}>
              Seu grau de obesidade é: {this.state.grauObsidade}
            </Text>
          </View>
        )}

      </View>
    );
  }

  onSubmit = () => {

    // debugger;

    if (!this.state.peso || !this.state.altura) return;

    let peso = 0;
    if (this.state.peso) {
      peso = parseFloat(this.state.peso);
    }

    let altura = 0;
    if (this.state.altura) {
      altura = parseFloat(this.state.altura);
    }

    const imc = peso / (altura * altura);
    const classificacao = this.getClassificacao(imc);
    const grauObsidade = this.getGrauObesidade(imc);

    this.setState({
      result: true,
      imc: imc.toFixed(2),
      classificacao: classificacao,
      grauObsidade: grauObsidade
    });

  }

  getClassificacao = imc => {
    if (imc < 18.5) {
      return 'Magreza';
    } else if (imc >= 18.5 && imc <= 24.9) {
      return 'Normal';
    } else if (imc >= 25 && imc <= 29.9) {
      return 'Sobrepeso';
    } else if (imc >= 30 && imc <= 39.9) {
      return 'Obesidade';
    } else {
      return 'Obesidade grave';
    }
  }


  getGrauObesidade = imc => {
    if (imc < 18.5) {
      return '0';
    } else if (imc >= 18.5 && imc <= 24.9) {
      return '0';
    } else if (imc >= 25 && imc <= 29.9) {
      return 'I';
    } else if (imc >= 30 && imc <= 39.9) {
      return 'II';
    } else {
      return 'III';
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  form: {
    marginTop: 30
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    color: "#212529"
  },
  input: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 4,
    fontSize: 16,
    fontWeight: "400",
    backgroundColor: "#ffffff",
    marginBottom: 16
  },

  button: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    fontSize: 16,
    fontWeight: "400",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4
  },
  buttonText: {
    color: "#fff"
  },
  resultTitulo: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  resultDescricao: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: '#333333'
  }

});

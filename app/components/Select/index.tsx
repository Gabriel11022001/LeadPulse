import { Picker } from '@react-native-picker/picker';
import { Text, View } from "react-native";
import styles from './styles';

export type SelectOpcao = {

  key: string;
  label: string;
  valor: string;

}

interface SelectProps {

  titulo: string;
  opcaoSelecionada: SelectOpcao; 
  opcoes: Array<SelectOpcao>;
  onSelecionarOpcao: (opcaoSelecionada: SelectOpcao) => void;

}

// componente que representa um select
const Select = ({ opcoes, onSelecionarOpcao, titulo, opcaoSelecionada }: SelectProps) => {

  return <View style={ styles.campo }>
    <Text style={ styles.titulo }>{ titulo }</Text>
    <View style={ styles.containerConteudo }>
      <Picker
        selectedValue={ opcaoSelecionada.valor }
        onValueChange={ (opcaoSelecionadaValor: string) => {
          onSelecionarOpcao(opcoes.find(op => op.valor === opcaoSelecionadaValor) ?? opcoes[ 0 ]);
        } }>
          { opcoes.map((opcao: SelectOpcao) => {

            return <Picker.Item key={ opcao.key } label={ opcao.label } value={ opcao.valor } />
          }) }
      </Picker>
    </View>
  </View>
}

export default Select;
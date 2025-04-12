import * as Contacts from 'expo-contacts';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ContactsDemo = () => {
  const [contatos, setContatos] = useState([]);
  const [contatoSelecionado, setContatoSelecionado] = useState(null);
  const [permissao, setPermissao] = useState(false);

  // Método 1: Solicitar permissão para acessar contatos
  const solicitarPermissao = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      setPermissao(status === 'granted');
      
      if (status === 'granted') {
        carregarContatos();
      } else {
        Alert.alert('Permissão Negada', 'Não foi possível acessar seus contatos');
      }
    } catch (erro) {
      Alert.alert('Erro', 'Ocorreu um erro ao solicitar permissão');
    }
  };

  // Método 2: Carregar lista de contatos
  const carregarContatos = async () => {
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.ID,
          Contacts.Fields.Name,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Emails
        ],
        sort: Contacts.SortTypes.FirstName
      });
      
      if (data.length > 0) {
        setContatos(data);
      }
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar os contatos');
    }
  };

  // Método 3: Obter detalhes de um contato específico
  const obterDetalhesContato = async (contatoId) => {
    try {
      const contato = await Contacts.getContactByIdAsync(contatoId, [
        Contacts.Fields.ID,
        Contacts.Fields.Name,
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Emails,
        Contacts.Fields.Image,
        Contacts.Fields.Birthday
      ]);
      
      setContatoSelecionado(contato);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível obter detalhes do contato');
    }
  };

  useEffect(() => {
    solicitarPermissao();
  }, []);

  const renderizarItemContato = ({ item }) => (
    <TouchableOpacity 
      style={estilos.itemContato}
      onPress={() => obterDetalhesContato(item.id)}
    >
      <Text style={estilos.nomeContato}>{item.name}</Text>
      {item.phoneNumbers && item.phoneNumbers[0] && (
        <Text style={estilos.infoContato}>
          {item.phoneNumbers[0].number}
        </Text>
      )}
    </TouchableOpacity>
  );

  const renderizarDetalhesContato = () => {
    if (!contatoSelecionado) return null;
    
    return (
      <View style={estilos.containerDetalhe}>
        <Text style={estilos.tituloDetalhe}>Detalhes do Contato</Text>
        <Text style={estilos.textoDetalhe}>Nome: {contatoSelecionado.name}</Text>
        
        {contatoSelecionado.phoneNumbers && contatoSelecionado.phoneNumbers.length > 0 && (
          <View>
            <Text style={estilos.subtituloDetalhe}>Telefones:</Text>
            {contatoSelecionado.phoneNumbers.map((telefone, index) => (
              <Text key={index} style={estilos.textoDetalhe}>
                {telefone.label}: {telefone.number}
              </Text>
            ))}
          </View>
        )}
        
        {contatoSelecionado.emails && contatoSelecionado.emails.length > 0 && (
          <View>
            <Text style={estilos.subtituloDetalhe}>Emails:</Text>
            {contatoSelecionado.emails.map((email, index) => (
              <Text key={index} style={estilos.textoDetalhe}>
                {email.label}: {email.email}
              </Text>
            ))}
          </View>
        )}
        
        {contatoSelecionado.birthday && (
          <Text style={estilos.textoDetalhe}>
            Aniversário: {new Date(contatoSelecionado.birthday.year, 
                                  contatoSelecionado.birthday.month, 
                                  contatoSelecionado.birthday.day).toLocaleDateString()}
          </Text>
        )}
      </View>
    );
  };

  if (!permissao) {
    return (
      <View style={estilos.containerPermissao}>
        <Text style={estilos.textoPermissao}>
          Para demonstrar a API de Contatos, precisamos de sua permissão
        </Text>
        <TouchableOpacity style={estilos.botao} onPress={solicitarPermissao}>
          <Text style={estilos.textoBotao}>Conceder Permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Demonstração de Contacts</Text>
      
      {contatos.length === 0 ? (
        <Text style={estilos.semContatos}>Nenhum contato encontrado</Text>
      ) : (
        <FlatList
          data={contatos.slice(0, 10)} // Limitando a 10 contatos para o exemplo
          renderItem={renderizarItemContato}
          keyExtractor={item => item.id}
          style={estilos.lista}
        />
      )}
      
      {renderizarDetalhesContato()}
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  lista: {
    maxHeight: 250,
  },
  itemContato: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  nomeContato: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContato: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  containerDetalhe: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  tituloDetalhe: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtituloDetalhe: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  textoDetalhe: {
    fontSize: 14,
    marginBottom: 5,
  },
  containerPermissao: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  textoPermissao: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  semContatos: {
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});

export default ContactsDemo; 
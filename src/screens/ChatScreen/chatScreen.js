import React, { 
  useState
 } from 'react';
import {
  View,
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  FlatList, 
  StyleSheet,
} from 'react-native';
import { 
  useChat
 } from '../../hooks';

export const ChatScreen = () => {
  const { messages, send, loading, error } = useChat();
  const [draft, setDraft] = useState('');

  const handleSend = () => {
    if (!draft.trim()) return;
    send(draft.trim());
    setDraft('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={m => m.id}
        renderItem={({ item }) => (
          <View style={[
              styles.bubble,
              item.role === 'assistant' ? styles.left : styles.right,
            ]}>
            <Text>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 12 }}
        inverted   // newest at bottom
      />

      {loading && <ActivityIndicator style={{ marginBottom: 8 }} />}

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.composer}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          style={styles.input}
          placeholder="Type a message"
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend} disabled={loading}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  bubble: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '80%',
  },
  left:  { backgroundColor: '#f0f0f0', alignSelf: 'flex-start' },
  right: { backgroundColor: '#0078fe', alignSelf: 'flex-end' ,},
  composer: {
    flexDirection: 'row', padding: 8, borderTopWidth: 1, borderColor: '#ddd',
  },
  input: { flex: 1, maxHeight: 120, paddingHorizontal: 8 },
  sendBtn: {
    backgroundColor: '#0078fe', justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 16, borderRadius: 8, marginLeft: 8,
  },
  error: { color: 'red', paddingHorizontal: 12 },
});
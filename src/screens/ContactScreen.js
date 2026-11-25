import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from '../components/Text';
import { colors, radius, MAX_WIDTH } from '../theme';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import Chip from '../components/Chip';

const SUBJECTS = ['Dúvida', 'Pedido', 'Troca/Devolução', 'Parceria'];

const FAQ = [
  { q: 'Qual o prazo de entrega?', a: 'De 3 a 7 dias úteis, dependendo da sua região.' },
  { q: 'Posso trocar um produto?', a: 'Sim! Você tem até 7 dias após o recebimento para solicitar troca ou devolução.' },
  { q: 'Quais as formas de pagamento?', a: 'Cartão de crédito em até 6x sem juros, Pix e boleto.' },
  { q: 'Como uso um cupom?', a: 'No carrinho, digite o código no campo de cupom e toque em Aplicar.' },
];

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function ContactScreen() {
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 3) e.name = 'Informe seu nome (mín. 3 letras).';
    if (!emailOk(form.email)) e.email = 'Informe um e-mail válido.';
    if (form.message.trim().length < 10) e.message = 'Escreva ao menos 10 caracteres.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    setSent({ name: form.name.trim().split(' ')[0] });
    setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' });
  };

  return (
    <View style={styles.page}>
      <View style={{ marginTop: 28 }}>
        <SectionTitle
          eyebrow="Contato"
          title="Fale com a gente"
          subtitle="Tire dúvidas, acompanhe pedidos ou proponha parcerias."
        />
      </View>

      <View style={styles.card}>
        {sent ? (
          <View style={{ alignItems: 'center', paddingVertical: 20 }}>
            <Text style={{ fontSize: 48 }}>✅</Text>
            <Text style={styles.sentTitle}>Mensagem enviada, {sent.name}!</Text>
            <Text style={styles.sentText}>Responderemos em até 24 horas.</Text>
            <Button
              title="Enviar outra mensagem"
              variant="outline"
              small
              onPress={() => setSent(null)}
              style={{ marginTop: 16 }}
            />
          </View>
        ) : (
          <>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              value={form.name}
              onChangeText={(v) => update('name', v)}
              placeholder="Seu nome"
              placeholderTextColor={colors.muted}
              style={[styles.input, errors.name && styles.inputError]}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              value={form.email}
              onChangeText={(v) => update('email', v)}
              placeholder="voce@email.com"
              placeholderTextColor={colors.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.input, errors.email && styles.inputError]}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>Assunto</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {SUBJECTS.map((s) => (
                <Chip key={s} label={s} active={form.subject === s} onPress={() => update('subject', s)} />
              ))}
            </View>

            <Text style={styles.label}>Mensagem</Text>
            <TextInput
              value={form.message}
              onChangeText={(v) => update('message', v)}
              placeholder="Como podemos ajudar?"
              placeholderTextColor={colors.muted}
              multiline
              numberOfLines={5}
              style={[styles.input, { height: 120, textAlignVertical: 'top' }, errors.message && styles.inputError]}
            />
            {errors.message && <Text style={styles.error}>{errors.message}</Text>}
            <Text style={styles.counter}>{form.message.length} caracteres</Text>

            <Button title="Enviar mensagem" onPress={submit} style={{ marginTop: 14 }} />
          </>
        )}
      </View>

      <View style={{ marginTop: 48 }}>
        <SectionTitle eyebrow="FAQ" title="Perguntas frequentes" />
        {FAQ.map((item, i) => (
          <Pressable
            key={item.q}
            onPress={() => setOpenFaq(openFaq === i ? null : i)}
            style={styles.faq}
          >
            <View style={styles.faqHead}>
              <Text style={styles.faqQ}>{item.q}</Text>
              <Text style={styles.faqIcon}>{openFaq === i ? '−' : '+'}</Text>
            </View>
            {openFaq === i && <Text style={styles.faqA}>{item.a}</Text>}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { width: '100%', maxWidth: 760, alignSelf: 'center', paddingHorizontal: 20 },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 22,
  },
  label: { color: colors.text, fontWeight: '700', marginTop: 14, marginBottom: 6 },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    color: colors.text,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
  },
  inputError: { borderColor: colors.danger },
  error: { color: colors.danger, fontSize: 13, marginTop: 4 },
  counter: { color: colors.muted, fontSize: 12, textAlign: 'right', marginTop: 4 },
  sentTitle: { color: colors.text, fontSize: 22, fontWeight: '800', marginTop: 10 },
  sentText: { color: colors.muted, marginTop: 6 },
  faq: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 10,
  },
  faqHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQ: { color: colors.text, fontWeight: '700', flex: 1, paddingRight: 10 },
  faqIcon: { color: colors.accent, fontSize: 22, fontWeight: '800' },
  faqA: { color: colors.muted, marginTop: 10, lineHeight: 21 },
});

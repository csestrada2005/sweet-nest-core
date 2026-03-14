/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

const logoUrl = 'https://mxhqimndiwzhcqgixuto.supabase.co/storage/v1/object/public/email-assets/papachoa-logo.png'

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Confirma tu correo en Papachoa México</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={logoUrl} alt="Papachoa México" width="140" height="auto" style={logo} />
        <Heading style={h1}>¡Bienvenido/a a Papachoa! 🤗</Heading>
        <Text style={text}>
          Gracias por registrarte en{' '}
          <Link href={siteUrl} style={link}>
            <strong>Papachoa México</strong>
          </Link>
          .
        </Text>
        <Text style={text}>
          Confirma tu correo (
          <Link href={`mailto:${recipient}`} style={link}>
            {recipient}
          </Link>
          ) haciendo clic en el botón:
        </Text>
        <Button style={button} href={confirmationUrl}>
          Confirmar correo
        </Button>
        <Text style={footer}>
          Si no creaste una cuenta, puedes ignorar este mensaje.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

const main = { backgroundColor: '#f7f4f3', fontFamily: "'Lato', Arial, sans-serif" }
const container = { padding: '40px 30px', maxWidth: '480px', margin: '0 auto' }
const logo = { margin: '0 0 24px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 'bold' as const,
  color: '#2a2a2a',
  margin: '0 0 20px',
}
const text = {
  fontSize: '15px',
  color: '#4a4a4a',
  lineHeight: '1.6',
  margin: '0 0 20px',
}
const link = { color: '#ac3c72', textDecoration: 'underline' }
const button = {
  backgroundColor: '#ac3c72',
  color: '#ffffff',
  fontSize: '15px',
  borderRadius: '16px',
  padding: '14px 28px',
  textDecoration: 'none',
  fontWeight: 'bold' as const,
}
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0' }

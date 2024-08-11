import React, {Fragment} from 'react'
import {Document, Image, Page, Text, View, StyleSheet, PDFDownloadLink} from '@react-pdf/renderer'
import {toAbsoluteUrl} from '../AssetHelpers'

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 1.5,
    flexDirection: 'column',
  },

  spaceBetween: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#3E3E3E',
  },

  titleContainer: {flexDirection: 'row', marginTop: 24},

  logo: {width: 90},

  reportTitle: {fontSize: 16, textAlign: 'center'},

  addressTitle: {fontSize: 11, fontStyle: 'bold'},

  invoice: {fontWeight: 'bold', fontSize: 20},

  invoiceNumber: {fontSize: 11, fontWeight: 'bold'},

  address: {fontWeight: 400, fontSize: 10},

  theader: {
    marginTop: 20,
    fontSize: 10,
    fontStyle: 'bold',
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    height: 20,
    backgroundColor: '#DEDEDE',
    borderColor: 'whitesmoke',
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  theader2: {flex: 2, borderRightWidth: 0, borderBottomWidth: 1},

  tbody: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    borderColor: 'whitesmoke',
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  total: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1.5,
    borderColor: 'whitesmoke',
    borderBottomWidth: 1,
  },

  tbody2: {flex: 2, borderRightWidth: 1},
})

type ReceiptItem = {
  id: number
  desc: string
  price: number
  qty: number
}

type InvoiceData = {
  address: string
  date: string
  invoiceNumber: string
  customerName: string
  total: number
  items: ReceiptItem[]
}

type Props = {
  invoiceData: InvoiceData
}

export const Invoice: React.FC<Props> = ({invoiceData}) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
          <Image style={styles.logo} src={toAbsoluteUrl('/media/logos/light_logo.png')} />
          <Text style={styles.reportTitle}>Piessa</Text>
        </View>
      </View>

      {/* address  */}
      <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
          <View>
            <Text style={styles.invoice}>Invoice </Text>
            <Text style={styles.invoiceNumber}>Invoice number: {invoiceData.invoiceNumber} </Text>
          </View>
          <View>
            <Text style={styles.addressTitle}>7, Ademola Odede, </Text>
            <Text style={styles.addressTitle}>Ikeja,</Text>
            <Text style={styles.addressTitle}>Lagos, Nigeria.</Text>
          </View>
        </View>
      </View>
      {/* user address */}
      <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
          <View style={{maxWidth: 200}}>
            <Text style={styles.addressTitle}>Bill to </Text>
            <Text style={styles.address}>{invoiceData.address}</Text>
          </View>
          <Text style={styles.addressTitle}>{invoiceData.date}</Text>
        </View>
      </View>
      {/* heder table */}
      <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
        <View style={[styles.theader, styles.theader2]}>
          <Text>Items</Text>
        </View>
        <View style={styles.theader}>
          <Text>Price</Text>
        </View>
        <View style={styles.theader}>
          <Text>Qty</Text>
        </View>
        <View style={styles.theader}>
          <Text>Amount</Text>
        </View>
      </View>
      {/* Items Table */}
      {invoiceData.items.map((receipt) => (
        <Fragment key={receipt.id}>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <View style={[styles.tbody, styles.tbody2]}>
              <Text>{receipt.desc}</Text>
            </View>
            <View style={styles.tbody}>
              <Text>{receipt.price.toFixed(2)} </Text>
            </View>
            <View style={styles.tbody}>
              <Text>{receipt.qty}</Text>
            </View>
            <View style={styles.tbody}>
              <Text>{(receipt.price * receipt.qty).toFixed(2)}</Text>
            </View>
          </View>
        </Fragment>
      ))}

      {/* Invoice Information */}
      <View style={{width: '100%', flexDirection: 'row'}}>
        <View style={styles.total}>
          <Text></Text>
        </View>
        <View style={styles.total}>
          <Text> </Text>
        </View>
        <View style={styles.tbody}>
          <Text>Total</Text>
        </View>
        <View style={styles.tbody}>
          <Text>
            {invoiceData.items.reduce((sum: any, item: any) => sum + item.price * item.qty, 0)}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
)

const MyInvoiceComponent: React.FC = () => {
  const invoiceData: InvoiceData = {
    address: 'user address',
    date: '2024-08-11',
    invoiceNumber: '123456',
    customerName: 'John Doe',
    total: 250.0,
    items: [
      {id: 1, desc: 'Product 1', price: 50.0, qty: 2},
      {id: 2, desc: 'Product 2', price: 75.0, qty: 2},
    ],
  }

  return (
    <div>
      <PDFDownloadLink document={<Invoice invoiceData={invoiceData} />} fileName='invoice.pdf'>
        {({loading}) =>
          loading ? (
            <div className='menu-item px-3'>
              <a className='menu-link px-3'>Svp Attendez</a>
            </div>
          ) : (
            <div className='menu-item px-3'>
              <a className='menu-link px-3'>Facture</a>
            </div>
          )
        }
      </PDFDownloadLink>
    </div>
  )
}

export default MyInvoiceComponent

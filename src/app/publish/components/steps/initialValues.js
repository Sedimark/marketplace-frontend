export const initialValuesAssetDefinitionEmpty = {
  name: '',
  short_description: '',
  description: '',
  picture_url: '',
  keywords: []
}

export const initialValuesAccessEmpty = {
  url: '',
  url_action: 'POST',
  headers: [{ key: '', value: '' }],
  queries: [{
    name: '',
    label: '',
    description: '',
    type: 'text',
    default_value: '',
    required: true
  }],
  license: '',
  terms_and_condition: '',
  data_controller: '',
  legal_basis: '',
  purpose: '',
  data_protection_contract_point: '',
  consent_withdrawal_contact_point: '',
  switchQuery: true,
  switchPII: true
}

export const initialValuesPolicyEmpty = {
  policies: [{ period: { startDate: '', endDate: '' }, policyName: '' }]
}

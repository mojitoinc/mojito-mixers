-----------------------------
Rollup File Analysis
-----------------------------
bundle size:    3.32 MB
original size:  6.198 MB
code reduction: 46.44 %
module count:   916

███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-use-country-region/dist/index.js
bundle space:    7.88 %
rendered size:   261.581 KB
original size:   261.581 KB
code reduction:  0 %
dependents:      1
  - /src/hooks/useCountryOptions.ts

█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/country-codes-list/countriesData.js
bundle space:    3.22 %
rendered size:   106.779 KB
original size:   106.776 KB
code reduction:  0 %
dependents:      0

█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-hook-form/dist/index.esm.mjs
bundle space:    2.19 %
rendered size:   72.577 KB
original size:   84.123 KB
code reduction:  13.73 %
dependents:      6
  - /src/forms/BillingInfoForm.tsx
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/shared/TextField/TextField.tsx
  - /src/components/shared/Checkbox/Checkbox.tsx
  - /src/components/shared/Select/CountrySelector/CountrySelector.tsx
  - /src/components/shared/Select/StateSelector/StateSelector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@auth0/auth0-react/dist/auth0-react.esm.js
bundle space:    1.66 %
rendered size:   55.169 KB
original size:   117.002 KB
code reduction:  52.85 %
dependents:      1
  - /src/components/shared/AuthorizedApolloProvider/AuthorizedApolloProvider.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/core/QueryManager.js
bundle space:    1.25 %
rendered size:   41.654 KB
original size:   41.601 KB
code reduction:  0 %
dependents:      1
  - /node_modules/@apollo/client/core/ApolloClient.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/language/parser.mjs
bundle space:    1.14 %
rendered size:   37.81 KB
original size:   38.626 KB
code reduction:  2.11 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Autocomplete/Autocomplete.js
bundle space:    1.06 %
rendered size:   35.284 KB
original size:   33.734 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
bundle space:    0.97 %
rendered size:   32.038 KB
original size:   33.885 KB
code reduction:  5.45 %
dependents:      1
  - /src/index.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/AutocompleteUnstyled/useAutocomplete.js
bundle space:    0.92 %
rendered size:   30.586 KB
original size:   30.72 KB
code reduction:  0.44 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Tooltip/Tooltip.js
bundle space:    0.81 %
rendered size:   26.858 KB
original size:   26.231 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/type/definition.mjs
bundle space:    0.8 %
rendered size:   26.652 KB
original size:   30.553 KB
code reduction:  12.77 %
dependents:      23
  - /node_modules/graphql/type/directives.mjs
  - /node_modules/graphql/type/scalars.mjs
  - /node_modules/graphql/type/introspection.mjs
  - /node_modules/graphql/execution/values.mjs
  - /node_modules/graphql/utilities/extendSchema.mjs
  - /node_modules/graphql/utilities/typeFromAST.mjs
  - /node_modules/graphql/utilities/valueFromAST.mjs
  - /node_modules/graphql/utilities/astFromValue.mjs
  - /node_modules/graphql/utilities/typeComparators.mjs
  - /node_modules/graphql/utilities/findBreakingChanges.mjs
  - /node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.mjs
  - /node_modules/graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs
  - /node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs
  - /node_modules/graphql/validation/rules/PossibleFragmentSpreadsRule.mjs
  - /node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs
  - /node_modules/graphql/validation/rules/ScalarLeafsRule.mjs
  - /node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.mjs
  - /node_modules/graphql/validation/rules/VariablesAreInputTypesRule.mjs
  - /node_modules/graphql/validation/rules/VariablesInAllowedPositionRule.mjs
  - /node_modules/graphql/validation/rules/UniqueEnumValueNamesRule.mjs
  - /node_modules/graphql/validation/rules/UniqueFieldDefinitionNamesRule.mjs
  - /node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs
  - /node_modules/graphql/execution/collectFields.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Tabs/Tabs.js
bundle space:    0.8 %
rendered size:   26.577 KB
original size:   26.421 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Slider/Slider.js
bundle space:    0.76 %
rendered size:   25.299 KB
original size:   23.823 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/queries/graphqlGenerated.tsx
bundle space:    0.73 %
rendered size:   24.197 KB
original size:   94.932 KB
code reduction:  74.51 %
dependents:      10
  - /src/hooks/usePlaid.ts
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/components/public/ErrorOverlay/ErrorOverlay.tsx
  - /src/hooks/useCreateInvoiceAndReservation.ts
  - /src/views/Billing/BillingView.tsx
  - /src/views/Purchasing/PurchasingView.tsx
  - /src/hooks/useFullPayment.ts
  - /src/hooks/useCreatePaymentMethod.ts
  - /src/hooks/useEncryptCard.ts
  - /src/hooks/useLimits.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs
bundle space:    0.72 %
rendered size:   23.888 KB
original size:   24.124 KB
code reduction:  0.98 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/language/lexer.mjs
bundle space:    0.71 %
rendered size:   23.622 KB
original size:   23.251 KB
code reduction:  0 %
dependents:      1
  - /node_modules/graphql/language/parser.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/InputBase/InputBase.js
bundle space:    0.7 %
rendered size:   23.255 KB
original size:   22.721 KB
code reduction:  0 %
dependents:      3
  - /node_modules/@mui/material/FilledInput/FilledInput.js
  - /node_modules/@mui/material/Input/Input.js
  - /node_modules/@mui/material/OutlinedInput/OutlinedInput.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/core/ObservableQuery.js
bundle space:    0.65 %
rendered size:   21.612 KB
original size:   21.438 KB
code reduction:  0 %
dependents:      3
  - /node_modules/@apollo/client/core/index.js
  - /node_modules/@apollo/client/core/QueryManager.js
  - /node_modules/@apollo/client/core/QueryInfo.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/SwipeableDrawer/SwipeableDrawer.js
bundle space:    0.65 %
rendered size:   21.529 KB
original size:   21.595 KB
code reduction:  0.31 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Rating/Rating.js
bundle space:    0.62 %
rendered size:   20.645 KB
original size:   19.837 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-payment-inputs/es/usePaymentInputs.js
bundle space:    0.62 %
rendered size:   20.621 KB
original size:   19.922 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Select/SelectInput.js
bundle space:    0.61 %
rendered size:   20.323 KB
original size:   20.225 KB
code reduction:  0 %
dependents:      1
  - /node_modules/@mui/material/Select/Select.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/optimism/lib/bundle.esm.js
bundle space:    0.58 %
rendered size:   19.234 KB
original size:   19.529 KB
code reduction:  1.51 %
dependents:      5
  - /node_modules/@apollo/client/cache/inmemory/entityStore.js
  - /node_modules/@apollo/client/cache/inmemory/inMemoryCache.js
  - /node_modules/@apollo/client/cache/inmemory/reactiveVars.js
  - /node_modules/@apollo/client/cache/core/cache.js
  - /node_modules/@apollo/client/cache/inmemory/readFromStore.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/SliderUnstyled/useSlider.js
bundle space:    0.57 %
rendered size:   19.049 KB
original size:   19.135 KB
code reduction:  0.45 %
dependents:      1
  - /node_modules/@mui/base/SliderUnstyled/SliderUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/cache/inmemory/entityStore.js
bundle space:    0.57 %
rendered size:   18.844 KB
original size:   18.821 KB
code reduction:  0 %
dependents:      2
  - /node_modules/@apollo/client/cache/inmemory/inMemoryCache.js
  - /node_modules/@apollo/client/cache/inmemory/readFromStore.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-transition-group/esm/Transition.js
bundle space:    0.56 %
rendered size:   18.747 KB
original size:   18.802 KB
code reduction:  0.29 %
dependents:      2
  - /node_modules/react-transition-group/esm/CSSTransition.js
  - /node_modules/react-transition-group/esm/SwitchTransition.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/cache/inmemory/policies.js
bundle space:    0.56 %
rendered size:   18.688 KB
original size:   18.904 KB
code reduction:  1.14 %
dependents:      2
  - /node_modules/@apollo/client/cache/inmemory/inMemoryCache.js
  - /node_modules/@apollo/client/cache/inmemory/writeToStore.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/cache/inmemory/writeToStore.js
bundle space:    0.56 %
rendered size:   18.582 KB
original size:   18.837 KB
code reduction:  1.35 %
dependents:      1
  - /node_modules/@apollo/client/cache/inmemory/inMemoryCache.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/SliderUnstyled/SliderUnstyled.js
bundle space:    0.54 %
rendered size:   18.048 KB
original size:   16.785 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Chip/Chip.js
bundle space:    0.53 %
rendered size:   17.739 KB
original size:   16.767 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/type/introspection.mjs
bundle space:    0.53 %
rendered size:   17.706 KB
original size:   17.157 KB
code reduction:  0 %
dependents:      2
  - /node_modules/graphql/utilities/extendSchema.mjs
  - /node_modules/graphql/validation/rules/KnownTypeNamesRule.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Grid/Grid.js
bundle space:    0.52 %
rendered size:   17.22 KB
original size:   16.818 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Popover/Popover.js
bundle space:    0.52 %
rendered size:   17.192 KB
original size:   16.78 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/forms/PaymentMethodForm.tsx
bundle space:    0.48 %
rendered size:   15.771 KB
original size:   16.609 KB
code reduction:  5.05 %
dependents:      1
  - /src/views/Payment/PaymentView.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/SpeedDial/SpeedDial.js
bundle space:    0.47 %
rendered size:   15.691 KB
original size:   15.443 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/zen-observable-ts/module.js
bundle space:    0.46 %
rendered size:   15.345 KB
original size:   15.37 KB
code reduction:  0.16 %
dependents:      1
  - /node_modules/@apollo/client/utilities/observables/Observable.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ButtonBase/ButtonBase.js
bundle space:    0.46 %
rendered size:   15.249 KB
original size:   14.866 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/schema.js
bundle space:    0.45 %
rendered size:   15.053 KB
original size:   15.351 KB
code reduction:  1.94 %
dependents:      4
  - /node_modules/yup/es/boolean.js
  - /node_modules/yup/es/string.js
  - /node_modules/yup/es/date.js
  - /node_modules/yup/es/object.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Button/Button.js
bundle space:    0.45 %
rendered size:   14.889 KB
original size:   14.586 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ListItem/ListItem.js
bundle space:    0.43 %
rendered size:   14.249 KB
original size:   14.193 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Snackbar/Snackbar.js
bundle space:    0.42 %
rendered size:   13.915 KB
original size:   13.633 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/PaginationItem/PaginationItem.js
bundle space:    0.42 %
rendered size:   13.881 KB
original size:   13.691 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@emotion/cache/dist/emotion-cache.esm.js
bundle space:    0.41 %
rendered size:   13.57 KB
original size:   13.601 KB
code reduction:  0.23 %
dependents:      3
  - /node_modules/@emotion/react/dist/emotion-react.esm.js
  - /node_modules/@mui/styled-engine/StyledEngineProvider/StyledEngineProvider.js
  - /node_modules/@emotion/react/dist/emotion-element-570fe3bb.esm.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/FilledInput/FilledInput.js
bundle space:    0.4 %
rendered size:   13.416 KB
original size:   13.012 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TablePagination/TablePagination.js
bundle space:    0.4 %
rendered size:   13.402 KB
original size:   13.295 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/core/LocalState.js
bundle space:    0.4 %
rendered size:   13.329 KB
original size:   13.467 KB
code reduction:  1.02 %
dependents:      2
  - /node_modules/@apollo/client/core/ApolloClient.js
  - /node_modules/@apollo/client/core/QueryManager.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-transition-group/esm/CSSTransition.js
bundle space:    0.4 %
rendered size:   13.216 KB
original size:   13.481 KB
code reduction:  1.97 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-plaid-link/dist/index.esm.js
bundle space:    0.39 %
rendered size:   12.804 KB
original size:   14.538 KB
code reduction:  11.93 %
dependents:      1
  - /src/hooks/usePlaid.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Collapse/Collapse.js
bundle space:    0.38 %
rendered size:   12.621 KB
original size:   12.361 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Dialog/Dialog.js
bundle space:    0.38 %
rendered size:   12.6 KB
original size:   12.296 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TextField/TextField.js
bundle space:    0.38 %
rendered size:   12.582 KB
original size:   12.191 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/ModalUnstyled/ModalUnstyled.js
bundle space:    0.38 %
rendered size:   12.576 KB
original size:   12.628 KB
code reduction:  0.41 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Badge/Badge.js
bundle space:    0.37 %
rendered size:   12.425 KB
original size:   12.096 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/TrapFocus/TrapFocus.js
bundle space:    0.37 %
rendered size:   12.288 KB
original size:   12.327 KB
code reduction:  0.32 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/PopperUnstyled/PopperUnstyled.js
bundle space:    0.37 %
rendered size:   12.221 KB
original size:   11.828 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/react/hooks/useQuery.js
bundle space:    0.37 %
rendered size:   12.142 KB
original size:   12.658 KB
code reduction:  4.08 %
dependents:      1
  - /node_modules/@apollo/client/react/hooks/useLazyQuery.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/views/Billing/BillingView.tsx
bundle space:    0.36 %
rendered size:   12.052 KB
original size:   12.967 KB
code reduction:  7.06 %
dependents:      1
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/config/theme/themeComponents.ts
bundle space:    0.36 %
rendered size:   11.871 KB
original size:   9.089 KB
code reduction:  0 %
dependents:      1
  - /src/config/theme/theme.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Slide/Slide.js
bundle space:    0.36 %
rendered size:   11.825 KB
original size:   11.901 KB
code reduction:  0.64 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/cache/inmemory/readFromStore.js
bundle space:    0.36 %
rendered size:   11.824 KB
original size:   12.206 KB
code reduction:  3.13 %
dependents:      1
  - /node_modules/@apollo/client/cache/inmemory/inMemoryCache.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/cache/inmemory/inMemoryCache.js
bundle space:    0.35 %
rendered size:   11.512 KB
original size:   12.031 KB
code reduction:  4.31 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/LinearProgress/LinearProgress.js
bundle space:    0.34 %
rendered size:   11.229 KB
original size:   11.208 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/OutlinedInput/OutlinedInput.js
bundle space:    0.34 %
rendered size:   11.228 KB
original size:   10.988 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Input/Input.js
bundle space:    0.34 %
rendered size:   11.163 KB
original size:   10.816 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/forms/BillingInfoForm.tsx
bundle space:    0.33 %
rendered size:   11.116 KB
original size:   12.031 KB
code reduction:  7.61 %
dependents:      1
  - /src/views/Billing/BillingView.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@emotion/react/dist/emotion-react.esm.js
bundle space:    0.33 %
rendered size:   11.092 KB
original size:   12.234 KB
code reduction:  9.33 %
dependents:      3
  - /node_modules/@mui/styled-engine/index.js
  - /node_modules/@mui/styled-engine/StyledEngineProvider/StyledEngineProvider.js
  - /node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/core/ApolloClient.js
bundle space:    0.33 %
rendered size:   10.99 KB
original size:   11.294 KB
code reduction:  2.69 %
dependents:      1
  - /node_modules/@apollo/client/core/index.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@emotion/serialize/dist/emotion-serialize.esm.js
bundle space:    0.33 %
rendered size:   10.889 KB
original size:   10.996 KB
code reduction:  0.97 %
dependents:      2
  - /node_modules/@emotion/react/dist/emotion-react.esm.js
  - /node_modules/@emotion/react/dist/emotion-element-570fe3bb.esm.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/InputUnstyled/InputUnstyled.js
bundle space:    0.32 %
rendered size:   10.53 KB
original size:   9.866 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ButtonGroup/ButtonGroup.js
bundle space:    0.32 %
rendered size:   10.462 KB
original size:   10.187 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/core/QueryInfo.js
bundle space:    0.31 %
rendered size:   10.421 KB
original size:   10.518 KB
code reduction:  0.92 %
dependents:      1
  - /node_modules/@apollo/client/core/QueryManager.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js
bundle space:    0.31 %
rendered size:   10.201 KB
original size:   10.42 KB
code reduction:  2.1 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Switch/Switch.js
bundle space:    0.31 %
rendered size:   10.141 KB
original size:   9.872 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/graphql/transform.js
bundle space:    0.3 %
rendered size:   9.901 KB
original size:   10.931 KB
code reduction:  9.42 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Drawer/Drawer.js
bundle space:    0.3 %
rendered size:   9.9 KB
original size:   9.773 KB
code reduction:  0 %
dependents:      2
  - /node_modules/@mui/material/SwipeableDrawer/SwipeableDrawer.js
  - /node_modules/@mui/material/SwipeableDrawer/SwipeArea.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/public/CheckoutOverlay/CheckoutOverlay.hooks.ts
bundle space:    0.3 %
rendered size:   9.834 KB
original size:   11.731 KB
code reduction:  16.17 %
dependents:      1
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/styles/createPalette.js
bundle space:    0.29 %
rendered size:   9.67 KB
original size:   9.745 KB
code reduction:  0.77 %
dependents:      1
  - /node_modules/@mui/material/styles/createTheme.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Select/Select.js
bundle space:    0.29 %
rendered size:   9.667 KB
original size:   9.701 KB
code reduction:  0.35 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ButtonBase/TouchRipple.js
bundle space:    0.28 %
rendered size:   9.432 KB
original size:   9.456 KB
code reduction:  0.25 %
dependents:      1
  - /node_modules/@mui/material/ButtonBase/ButtonBase.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/MenuList/MenuList.js
bundle space:    0.28 %
rendered size:   9.419 KB
original size:   9.651 KB
code reduction:  2.4 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/createPopper.js
bundle space:    0.28 %
rendered size:   9.369 KB
original size:   10.131 KB
code reduction:  7.52 %
dependents:      1
  - /node_modules/@popperjs/core/lib/popper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/FormControl/FormControl.js
bundle space:    0.28 %
rendered size:   9.28 KB
original size:   9.22 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/object.js
bundle space:    0.28 %
rendered size:   9.275 KB
original size:   9.55 KB
code reduction:  2.88 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/language/printer.mjs
bundle space:    0.28 %
rendered size:   9.243 KB
original size:   9.361 KB
code reduction:  1.26 %
dependents:      10
  - /node_modules/graphql/type/definition.mjs
  - /node_modules/graphql/type/scalars.mjs
  - /node_modules/graphql/type/introspection.mjs
  - /node_modules/graphql/execution/values.mjs
  - /node_modules/graphql/utilities/findBreakingChanges.mjs
  - /node_modules/graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs
  - /node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs
  - /node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs
  - /node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.mjs
  - /node_modules/graphql/validation/rules/VariablesAreInputTypesRule.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/ListboxUnstyled/defaultListboxReducer.js
bundle space:    0.28 %
rendered size:   9.18 KB
original size:   9.102 KB
code reduction:  0 %
dependents:      1
  - /node_modules/@mui/base/ListboxUnstyled/useListbox.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Menu/Menu.js
bundle space:    0.27 %
rendered size:   9.051 KB
original size:   8.985 KB
code reduction:  0 %
dependents:      1
  - /node_modules/@mui/material/Select/SelectInput.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/colorManipulator.js
bundle space:    0.27 %
rendered size:   8.986 KB
original size:   9.659 KB
code reduction:  6.97 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/MenuItem/MenuItem.js
bundle space:    0.27 %
rendered size:   8.95 KB
original size:   9.106 KB
code reduction:  1.71 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/SelectUnstyled/useSelect.js
bundle space:    0.27 %
rendered size:   8.915 KB
original size:   8.95 KB
code reduction:  0.39 %
dependents:      2
  - /node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.js
  - /node_modules/@mui/base/SelectUnstyled/SelectUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Alert/Alert.js
bundle space:    0.27 %
rendered size:   8.91 KB
original size:   9.041 KB
code reduction:  1.45 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ListItemButton/ListItemButton.js
bundle space:    0.27 %
rendered size:   8.866 KB
original size:   8.962 KB
code reduction:  1.07 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.js
bundle space:    0.27 %
rendered size:   8.805 KB
original size:   9.137 KB
code reduction:  3.63 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/SelectUnstyled/SelectUnstyled.js
bundle space:    0.26 %
rendered size:   8.783 KB
original size:   9.04 KB
code reduction:  2.84 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/domain/circle/circle.utils.ts
bundle space:    0.26 %
rendered size:   8.754 KB
original size:   8.984 KB
code reduction:  2.56 %
dependents:      8
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/views/Billing/BillingView.tsx
  - /src/views/Confirmation/ConfirmationView.tsx
  - /src/views/Payment/PaymentView.tsx
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.hooks.ts
  - /src/hooks/useFullPayment.ts
  - /src/forms/BillingInfoForm.tsx
  - /src/hooks/useCreatePaymentMethod.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/type/scalars.mjs
bundle space:    0.26 %
rendered size:   8.571 KB
original size:   8.655 KB
code reduction:  0.97 %
dependents:      6
  - /node_modules/graphql/type/directives.mjs
  - /node_modules/graphql/type/introspection.mjs
  - /node_modules/graphql/utilities/extendSchema.mjs
  - /node_modules/graphql/utilities/astFromValue.mjs
  - /node_modules/graphql/utilities/findBreakingChanges.mjs
  - /node_modules/graphql/validation/rules/KnownTypeNamesRule.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Modal/Modal.js
bundle space:    0.26 %
rendered size:   8.517 KB
original size:   8.409 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@wry/equality/lib/equality.esm.js
bundle space:    0.25 %
rendered size:   8.393 KB
original size:   8.472 KB
code reduction:  0.93 %
dependents:      8
  - /node_modules/@apollo/client/core/ObservableQuery.js
  - /node_modules/@apollo/client/core/QueryManager.js
  - /node_modules/@apollo/client/cache/inmemory/entityStore.js
  - /node_modules/@apollo/client/cache/inmemory/inMemoryCache.js
  - /node_modules/@apollo/client/react/hooks/useMutation.js
  - /node_modules/@apollo/client/react/hooks/useQuery.js
  - /node_modules/@apollo/client/core/QueryInfo.js
  - /node_modules/@apollo/client/cache/inmemory/writeToStore.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js
bundle space:    0.25 %
rendered size:   8.181 KB
original size:   8.127 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Tab/Tab.js
bundle space:    0.25 %
rendered size:   8.166 KB
original size:   8.068 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/CircularProgress/CircularProgress.js
bundle space:    0.25 %
rendered size:   8.163 KB
original size:   8.135 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ToggleButton/ToggleButton.js
bundle space:    0.25 %
rendered size:   8.158 KB
original size:   8.144 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Grow/Grow.js
bundle space:    0.24 %
rendered size:   8.111 KB
original size:   8.036 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Accordion/Accordion.js
bundle space:    0.24 %
rendered size:   8.089 KB
original size:   8.255 KB
code reduction:  2.01 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/SvgIcon/SvgIcon.js
bundle space:    0.24 %
rendered size:   8.086 KB
original size:   8.103 KB
code reduction:  0.21 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Divider/Divider.js
bundle space:    0.24 %
rendered size:   8.046 KB
original size:   8.004 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/ListboxUnstyled/useListbox.js
bundle space:    0.24 %
rendered size:   7.834 KB
original size:   7.931 KB
code reduction:  1.22 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Fab/Fab.js
bundle space:    0.24 %
rendered size:   7.823 KB
original size:   7.726 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/createStyled.js
bundle space:    0.23 %
rendered size:   7.756 KB
original size:   8.037 KB
code reduction:  3.5 %
dependents:      1
  - /node_modules/@mui/system/esm/styled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Pagination/Pagination.js
bundle space:    0.23 %
rendered size:   7.695 KB
original size:   7.564 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/public/CheckoutOverlay/CheckoutOverlay.utils.ts
bundle space:    0.23 %
rendered size:   7.576 KB
original size:   7.963 KB
code reduction:  4.86 %
dependents:      8
  - /src/index.ts
  - /src/hooks/usePlaid.ts
  - /src/components/public/SuccessOverlay/SuccessOverlay.tsx
  - /src/components/public/ErrorOverlay/ErrorOverlay.tsx
  - /src/components/public/PlaidOverlay/PlaidOverlay.ts
  - /src/components/public/useOpenCloseCheckoutModal/useOpenCloseCheckoutModal.ts
  - /src/views/Purchasing/PurchasingView.tsx
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.hooks.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/SpeedDialAction/SpeedDialAction.js
bundle space:    0.23 %
rendered size:   7.575 KB
original size:   7.686 KB
code reduction:  1.44 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Checkbox/Checkbox.js
bundle space:    0.23 %
rendered size:   7.489 KB
original size:   7.587 KB
code reduction:  1.29 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/IconButton/IconButton.js
bundle space:    0.22 %
rendered size:   7.455 KB
original size:   7.474 KB
code reduction:  0.25 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/hooks/useFullPayment.ts
bundle space:    0.22 %
rendered size:   7.351 KB
original size:   7.438 KB
code reduction:  1.17 %
dependents:      1
  - /src/views/Purchasing/PurchasingView.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/CheckoutModalFooter/CheckoutModalFooter.tsx
bundle space:    0.22 %
rendered size:   7.341 KB
original size:   8.075 KB
code reduction:  9.09 %
dependents:      7
  - /src/views/Authentication/AuthenticationView.tsx
  - /src/views/Confirmation/ConfirmationView.tsx
  - /src/views/Error/ErrorView.tsx
  - /src/forms/BillingInfoForm.tsx
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/shared/SavedBillingDetailsSelector/SavedBillingDetailsSelector.tsx
  - /src/components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/SwitchBase.js
bundle space:    0.22 %
rendered size:   7.301 KB
original size:   7.408 KB
code reduction:  1.44 %
dependents:      3
  - /node_modules/@mui/material/Checkbox/Checkbox.js
  - /node_modules/@mui/material/Radio/Radio.js
  - /node_modules/@mui/material/Switch/Switch.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TableCell/TableCell.js
bundle space:    0.22 %
rendered size:   7.287 KB
original size:   7.391 KB
code reduction:  1.41 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Breadcrumbs/Breadcrumbs.js
bundle space:    0.22 %
rendered size:   7.256 KB
original size:   7.44 KB
code reduction:  2.47 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-transition-group/esm/SwitchTransition.js
bundle space:    0.22 %
rendered size:   7.21 KB
original size:   7.066 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Radio/Radio.js
bundle space:    0.22 %
rendered size:   7.192 KB
original size:   7.277 KB
code reduction:  1.17 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/cssVars/useCurrentColorScheme.js
bundle space:    0.21 %
rendered size:   7.122 KB
original size:   7.154 KB
code reduction:  0.45 %
dependents:      1
  - /node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/InputLabel/InputLabel.js
bundle space:    0.21 %
rendered size:   7.04 KB
original size:   7.155 KB
code reduction:  1.61 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/TextareaAutosize/TextareaAutosize.js
bundle space:    0.21 %
rendered size:   7.012 KB
original size:   7.016 KB
code reduction:  0.06 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/ButtonUnstyled/useButton.js
bundle space:    0.21 %
rendered size:   7.008 KB
original size:   7.188 KB
code reduction:  2.5 %
dependents:      1
  - /node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Avatar/Avatar.js
bundle space:    0.21 %
rendered size:   6.936 KB
original size:   6.911 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/StepLabel/StepLabel.js
bundle space:    0.21 %
rendered size:   6.891 KB
original size:   6.928 KB
code reduction:  0.53 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/graphql/storeUtils.js
bundle space:    0.21 %
rendered size:   6.882 KB
original size:   7.121 KB
code reduction:  3.36 %
dependents:      2
  - /node_modules/@apollo/client/utilities/graphql/getFromAST.js
  - /node_modules/@apollo/client/utilities/graphql/transform.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/ModalUnstyled/ModalManager.js
bundle space:    0.21 %
rendered size:   6.877 KB
original size:   6.977 KB
code reduction:  1.43 %
dependents:      1
  - /node_modules/@mui/base/ModalUnstyled/ModalUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ImageListItemBar/ImageListItemBar.js
bundle space:    0.2 %
rendered size:   6.694 KB
original size:   6.718 KB
code reduction:  0.36 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/language/visitor.mjs
bundle space:    0.2 %
rendered size:   6.691 KB
original size:   9.565 KB
code reduction:  30.05 %
dependents:      1
  - /node_modules/graphql/language/printer.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Skeleton/Skeleton.js
bundle space:    0.2 %
rendered size:   6.68 KB
original size:   6.677 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/FormControlLabel/FormControlLabel.js
bundle space:    0.2 %
rendered size:   6.571 KB
original size:   6.761 KB
code reduction:  2.81 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Link/Link.js
bundle space:    0.2 %
rendered size:   6.543 KB
original size:   6.774 KB
code reduction:  3.41 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Zoom/Zoom.js
bundle space:    0.2 %
rendered size:   6.477 KB
original size:   6.455 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/AvatarGroup/AvatarGroup.js
bundle space:    0.19 %
rendered size:   6.455 KB
original size:   6.458 KB
code reduction:  0.05 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.js
bundle space:    0.19 %
rendered size:   6.453 KB
original size:   6.072 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/hooks/usePlaid.ts
bundle space:    0.19 %
rendered size:   6.449 KB
original size:   7.331 KB
code reduction:  12.03 %
dependents:      3
  - /src/index.ts
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/views/Payment/PaymentView.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/ClickAwayListener/ClickAwayListener.js
bundle space:    0.19 %
rendered size:   6.429 KB
original size:   6.638 KB
code reduction:  3.15 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/MobileStepper/MobileStepper.js
bundle space:    0.19 %
rendered size:   6.414 KB
original size:   6.572 KB
code reduction:  2.4 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/views/Payment/PaymentView.tsx
bundle space:    0.19 %
rendered size:   6.411 KB
original size:   8.654 KB
code reduction:  25.92 %
dependents:      1
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Fade/Fade.js
bundle space:    0.19 %
rendered size:   6.386 KB
original size:   6.44 KB
code reduction:  0.84 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/error/GraphQLError.mjs
bundle space:    0.19 %
rendered size:   6.34 KB
original size:   7.119 KB
code reduction:  10.94 %
dependents:      39
  - /node_modules/graphql/type/definition.mjs
  - /node_modules/graphql/type/scalars.mjs
  - /node_modules/graphql/type/assertName.mjs
  - /node_modules/graphql/execution/values.mjs
  - /node_modules/graphql/error/syntaxError.mjs
  - /node_modules/graphql/validation/rules/ExecutableDefinitionsRule.mjs
  - /node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.mjs
  - /node_modules/graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs
  - /node_modules/graphql/validation/rules/KnownArgumentNamesRule.mjs
  - /node_modules/graphql/validation/rules/KnownDirectivesRule.mjs
  - /node_modules/graphql/validation/rules/KnownFragmentNamesRule.mjs
  - /node_modules/graphql/validation/rules/KnownTypeNamesRule.mjs
  - /node_modules/graphql/validation/rules/LoneAnonymousOperationRule.mjs
  - /node_modules/graphql/validation/rules/NoFragmentCyclesRule.mjs
  - /node_modules/graphql/validation/rules/NoUndefinedVariablesRule.mjs
  - /node_modules/graphql/validation/rules/NoUnusedFragmentsRule.mjs
  - /node_modules/graphql/validation/rules/NoUnusedVariablesRule.mjs
  - /node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs
  - /node_modules/graphql/validation/rules/PossibleFragmentSpreadsRule.mjs
  - /node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs
  - /node_modules/graphql/validation/rules/ScalarLeafsRule.mjs
  - /node_modules/graphql/validation/rules/SingleFieldSubscriptionsRule.mjs
  - /node_modules/graphql/validation/rules/UniqueArgumentNamesRule.mjs
  - /node_modules/graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs
  - /node_modules/graphql/validation/rules/UniqueFragmentNamesRule.mjs
  - /node_modules/graphql/validation/rules/UniqueInputFieldNamesRule.mjs
  - /node_modules/graphql/validation/rules/UniqueOperationNamesRule.mjs
  - /node_modules/graphql/validation/rules/UniqueVariableNamesRule.mjs
  - /node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.mjs
  - /node_modules/graphql/validation/rules/VariablesAreInputTypesRule.mjs
  - /node_modules/graphql/validation/rules/LoneSchemaDefinitionRule.mjs
  - /node_modules/graphql/validation/rules/VariablesInAllowedPositionRule.mjs
  - /node_modules/graphql/validation/rules/UniqueOperationTypesRule.mjs
  - /node_modules/graphql/validation/rules/UniqueTypeNamesRule.mjs
  - /node_modules/graphql/validation/rules/UniqueEnumValueNamesRule.mjs
  - /node_modules/graphql/validation/rules/UniqueFieldDefinitionNamesRule.mjs
  - /node_modules/graphql/validation/rules/UniqueArgumentDefinitionNamesRule.mjs
  - /node_modules/graphql/validation/rules/UniqueDirectiveNamesRule.mjs
  - /node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-transition-group/esm/TransitionGroup.js
bundle space:    0.19 %
rendered size:   6.277 KB
original size:   6.553 KB
code reduction:  4.21 %
dependents:      1
  - /node_modules/react-transition-group/esm/ReplaceTransition.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/InputUnstyled/useInput.js
bundle space:    0.19 %
rendered size:   6.274 KB
original size:   6.485 KB
code reduction:  3.25 %
dependents:      1
  - /node_modules/@mui/base/InputUnstyled/InputUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Typography/Typography.js
bundle space:    0.19 %
rendered size:   6.264 KB
original size:   6.371 KB
code reduction:  1.68 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/AccordionSummary/AccordionSummary.js
bundle space:    0.19 %
rendered size:   6.243 KB
original size:   6.417 KB
code reduction:  2.71 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/modifiers/computeStyles.js
bundle space:    0.19 %
rendered size:   6.238 KB
original size:   6.598 KB
code reduction:  5.46 %
dependents:      1
  - /node_modules/@popperjs/core/lib/popper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.tsx
bundle space:    0.19 %
rendered size:   6.167 KB
original size:   7.644 KB
code reduction:  19.32 %
dependents:      1
  - /src/views/Payment/PaymentView.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/InputAdornment/InputAdornment.js
bundle space:    0.18 %
rendered size:   6.117 KB
original size:   6.384 KB
code reduction:  4.18 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
bundle space:    0.18 %
rendered size:   6.108 KB
original size:   6.585 KB
code reduction:  7.24 %
dependents:      1
  - /node_modules/@popperjs/core/lib/popper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/CardHeader/CardHeader.js
bundle space:    0.18 %
rendered size:   6.107 KB
original size:   6.095 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/views/Purchasing/PurchasingView.tsx
bundle space:    0.18 %
rendered size:   6.061 KB
original size:   6.86 KB
code reduction:  11.65 %
dependents:      1
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/CheckoutItemCost/Total/CheckoutItemCostTotal.tsx
bundle space:    0.18 %
rendered size:   6.037 KB
original size:   4.454 KB
code reduction:  0 %
dependents:      2
  - /src/components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.tsx
  - /src/components/payments/CheckoutItemCost/Purchase/CheckoutItemCostPurchase.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/string.js
bundle space:    0.18 %
rendered size:   6.027 KB
original size:   6.022 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/hooks/useCreatePaymentMethod.ts
bundle space:    0.18 %
rendered size:   5.82 KB
original size:   6.063 KB
code reduction:  4.01 %
dependents:      1
  - /src/hooks/useFullPayment.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/NativeSelect/NativeSelectInput.js
bundle space:    0.17 %
rendered size:   5.785 KB
original size:   6.054 KB
code reduction:  4.44 %
dependents:      3
  - /node_modules/@mui/material/NativeSelect/NativeSelect.js
  - /node_modules/@mui/material/Select/Select.js
  - /node_modules/@mui/material/Select/SelectInput.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/FormControlUnstyled/FormControlUnstyled.js
bundle space:    0.17 %
rendered size:   5.729 KB
original size:   5.707 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/stylis/src/Parser.js
bundle space:    0.17 %
rendered size:   5.726 KB
original size:   5.581 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@wry/context/lib/context.esm.js
bundle space:    0.17 %
rendered size:   5.647 KB
original size:   8.182 KB
code reduction:  30.98 %
dependents:      2
  - /node_modules/@apollo/client/cache/inmemory/reactiveVars.js
  - /node_modules/optimism/lib/bundle.esm.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/AppBar/AppBar.js
bundle space:    0.17 %
rendered size:   5.613 KB
original size:   5.724 KB
code reduction:  1.94 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Popper/Popper.js
bundle space:    0.17 %
rendered size:   5.604 KB
original size:   5.127 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/FormLabel/FormLabel.js
bundle space:    0.16 %
rendered size:   5.424 KB
original size:   5.541 KB
code reduction:  2.11 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ListItemText/ListItemText.js
bundle space:    0.16 %
rendered size:   5.418 KB
original size:   5.54 KB
code reduction:  2.2 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Icon/Icon.js
bundle space:    0.16 %
rendered size:   5.355 KB
original size:   5.405 KB
code reduction:  0.93 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Paper/Paper.js
bundle space:    0.16 %
rendered size:   5.347 KB
original size:   5.701 KB
code reduction:  6.21 %
dependents:      1
  - /node_modules/@mui/material/styles/experimental_extendTheme.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/FormHelperText/FormHelperText.js
bundle space:    0.16 %
rendered size:   5.341 KB
original size:   5.518 KB
code reduction:  3.21 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/cssVars/cssVarsParser.js
bundle space:    0.16 %
rendered size:   5.335 KB
original size:   5.364 KB
code reduction:  0.54 %
dependents:      1
  - /node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-payment-inputs/es/utils/validator-0f41e23d.js
bundle space:    0.16 %
rendered size:   5.286 KB
original size:   5.761 KB
code reduction:  8.25 %
dependents:      2
  - /node_modules/react-payment-inputs/es/usePaymentInputs.js
  - /node_modules/react-payment-inputs/es/utils/index.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@emotion/react/dist/emotion-element-570fe3bb.esm.js
bundle space:    0.16 %
rendered size:   5.268 KB
original size:   10.331 KB
code reduction:  49.01 %
dependents:      1
  - /node_modules/@emotion/react/dist/emotion-react.esm.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/Container/createContainer.js
bundle space:    0.16 %
rendered size:   5.189 KB
original size:   5.307 KB
code reduction:  2.22 %
dependents:      1
  - /node_modules/@mui/system/esm/Container/Container.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/MenuUnstyled/MenuUnstyled.js
bundle space:    0.16 %
rendered size:   5.178 KB
original size:   5.326 KB
code reduction:  2.78 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/stylis/src/Prefixer.js
bundle space:    0.16 %
rendered size:   5.174 KB
original size:   4.791 KB
code reduction:  0 %
dependents:      1
  - /node_modules/stylis/src/Middleware.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TablePagination/TablePaginationActions.js
bundle space:    0.16 %
rendered size:   5.157 KB
original size:   5.427 KB
code reduction:  4.98 %
dependents:      1
  - /node_modules/@mui/material/TablePagination/TablePagination.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/tslib/tslib.es6.js
bundle space:    0.16 %
rendered size:   5.153 KB
original size:   12.28 KB
code reduction:  58.04 %
dependents:      70
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/components/public/SuccessOverlay/SuccessOverlay.tsx
  - /src/components/public/ErrorOverlay/ErrorOverlay.tsx
  - /src/hooks/useCreateInvoiceAndReservation.ts
  - /src/domain/circle/circle.utils.ts
  - /src/views/Billing/BillingView.tsx
  - /src/views/Payment/PaymentView.tsx
  - /src/views/Error/ErrorView.tsx
  - /src/components/public/SuccessOverlay/StaticSuccessOverlay.tsx
  - /src/components/public/ErrorOverlay/StaticErrorOverlay.tsx
  - /src/components/shared/FullScreenOverlay/FullScreenOverlay.tsx
  - /src/components/shared/ProvidersInjector/ProvidersInjector.tsx
  - /src/components/shared/StatusIcon/StatusIcon.tsx
  - /src/hooks/useFullPayment.ts
  - /src/forms/BillingInfoForm.tsx
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/payments/CheckoutModalFooter/CheckoutModalFooter.tsx
  - /src/components/payments/DebugBox/DebugBox.tsx
  - /src/components/shared/PrimaryButton/PrimaryButton.tsx
  - /src/components/shared/Img/Img.tsx
  - /src/components/shared/AuthorizedApolloProvider/AuthorizedApolloProvider.tsx
  - /src/components/payments/BillingInfo/Item/BillingInfoItem.tsx
  - /src/hooks/useCreatePaymentMethod.ts
  - /src/hooks/useEncryptCard.ts
  - /src/components/shared/InputGroupLabel/InputGroupLabel.tsx
  - /src/components/shared/TextField/TextField.tsx
  - /src/components/shared/SecondaryButton/SecondaryButton.tsx
  - /src/components/shared/Select/Select.tsx
  - /src/components/shared/TaxesMessagesBox/TaxesMessagesBox.tsx
  - /src/components/shared/FormErrorsBox/FormErrorsBox.tsx
  - /src/components/payments/DisplayBox/DisplayBox.tsx
  - /src/components/shared/CardNumberField/CardNumberField.tsx
  - /src/components/shared/CardExpiryDateField/CardExpiryDateField.tsx
  - /src/components/shared/CardSecureCodeField/CardSecureCodeField.tsx
  - /src/components/shared/Checkbox/Checkbox.tsx
  - /src/components/shared/Select/CountrySelector/CountrySelector.tsx
  - /src/components/shared/Select/StateSelector/StateSelector.tsx
  - /src/components/shared/Icons/Icons.tsx
  - /src/components/shared/CopyButton/CopyButton.tsx
  - /src/components/payments/PaymentDetailsItem/Item/PaymentDetailsItem.tsx
  - /src/utils/encryptionUtils.ts
  - /src/components/shared/Select/WalletAddressSelector/WalletAddressSelector.tsx
  - /node_modules/@apollo/client/core/ApolloClient.js
  - /node_modules/@apollo/client/core/ObservableQuery.js
  - /node_modules/@apollo/client/errors/index.js
  - /node_modules/ts-invariant/lib/invariant.js
  - /node_modules/graphql-tag/lib/index.js
  - /node_modules/@apollo/client/core/QueryManager.js
  - /node_modules/@apollo/client/core/LocalState.js
  - /node_modules/@apollo/client/cache/inmemory/entityStore.js
  - /node_modules/@apollo/client/cache/inmemory/inMemoryCache.js
  - /node_modules/@apollo/client/cache/inmemory/policies.js
  - /node_modules/@apollo/client/cache/inmemory/object-canon.js
  - /node_modules/@apollo/client/cache/core/cache.js
  - /node_modules/@apollo/client/utilities/graphql/fragments.js
  - /node_modules/@apollo/client/utilities/graphql/transform.js
  - /node_modules/@apollo/client/utilities/observables/Concast.js
  - /node_modules/@apollo/client/utilities/common/mergeDeep.js
  - /node_modules/@apollo/client/utilities/common/mergeOptions.js
  - /node_modules/@apollo/client/link/core/ApolloLink.js
  - /node_modules/@apollo/client/link/http/selectHttpOptionsAndBody.js
  - /node_modules/@apollo/client/link/http/createHttpLink.js
  - /node_modules/@apollo/client/link/http/HttpLink.js
  - /node_modules/@apollo/client/link/utils/createOperation.js
  - /node_modules/@apollo/client/react/hooks/useLazyQuery.js
  - /node_modules/@apollo/client/react/hooks/useMutation.js
  - /node_modules/@apollo/client/react/hooks/useQuery.js
  - /node_modules/@apollo/client/core/QueryInfo.js
  - /node_modules/@apollo/client/cache/inmemory/readFromStore.js
  - /node_modules/@apollo/client/cache/inmemory/writeToStore.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/BottomNavigationAction/BottomNavigationAction.js
bundle space:    0.15 %
rendered size:   5.134 KB
original size:   5.38 KB
code reduction:  4.57 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/language/ast.mjs
bundle space:    0.15 %
rendered size:   5.131 KB
original size:   5.138 KB
code reduction:  0.14 %
dependents:      4
  - /node_modules/graphql/language/parser.mjs
  - /node_modules/graphql/language/lexer.mjs
  - /node_modules/graphql/language/visitor.mjs
  - /node_modules/graphql/validation/rules/KnownDirectivesRule.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Step/Step.js
bundle space:    0.15 %
rendered size:   5.06 KB
original size:   5.265 KB
code reduction:  3.89 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/TabsListUnstyled/useTabsList.js
bundle space:    0.15 %
rendered size:   5.055 KB
original size:   5.314 KB
code reduction:  4.87 %
dependents:      1
  - /node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/StepContent/StepContent.js
bundle space:    0.15 %
rendered size:   5.02 KB
original size:   5.092 KB
code reduction:  1.41 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ImageListItem/ImageListItem.js
bundle space:    0.15 %
rendered size:   5.009 KB
original size:   5.25 KB
code reduction:  4.59 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/http/createHttpLink.js
bundle space:    0.15 %
rendered size:   5.008 KB
original size:   5.576 KB
code reduction:  10.19 %
dependents:      1
  - /node_modules/@apollo/client/link/http/HttpLink.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/spacing.js
bundle space:    0.15 %
rendered size:   4.969 KB
original size:   5.397 KB
code reduction:  7.93 %
dependents:      4
  - /node_modules/@mui/system/esm/borders.js
  - /node_modules/@mui/system/esm/grid.js
  - /node_modules/@mui/system/esm/getThemeValue.js
  - /node_modules/@mui/system/esm/createTheme/createSpacing.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Stack/Stack.js
bundle space:    0.15 %
rendered size:   4.945 KB
original size:   5.059 KB
code reduction:  2.25 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TableSortLabel/TableSortLabel.js
bundle space:    0.15 %
rendered size:   4.945 KB
original size:   5.204 KB
code reduction:  4.98 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/useIsFocusVisible.js
bundle space:    0.15 %
rendered size:   4.931 KB
original size:   5.325 KB
code reduction:  7.4 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/utilities/valueFromAST.mjs
bundle space:    0.15 %
rendered size:   4.898 KB
original size:   5.083 KB
code reduction:  3.64 %
dependents:      2
  - /node_modules/graphql/execution/values.mjs
  - /node_modules/graphql/utilities/extendSchema.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/CheckoutModalHeader/CheckoutModalHeader.tsx
bundle space:    0.15 %
rendered size:   4.888 KB
original size:   5.254 KB
code reduction:  6.97 %
dependents:      3
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/components/public/SuccessOverlay/StaticSuccessOverlay.tsx
  - /src/components/public/ErrorOverlay/StaticErrorOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Backdrop/Backdrop.js
bundle space:    0.15 %
rendered size:   4.831 KB
original size:   4.772 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/cache/inmemory/key-extractor.js
bundle space:    0.15 %
rendered size:   4.816 KB
original size:   5.015 KB
code reduction:  3.97 %
dependents:      1
  - /node_modules/@apollo/client/cache/inmemory/policies.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/MenuUnstyled/useMenu.js
bundle space:    0.14 %
rendered size:   4.781 KB
original size:   4.782 KB
code reduction:  0.02 %
dependents:      1
  - /node_modules/@mui/base/MenuUnstyled/MenuUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ImageList/ImageList.js
bundle space:    0.14 %
rendered size:   4.765 KB
original size:   4.813 KB
code reduction:  1 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/type/directives.mjs
bundle space:    0.14 %
rendered size:   4.755 KB
original size:   5.492 KB
code reduction:  13.42 %
dependents:      6
  - /node_modules/graphql/utilities/extendSchema.mjs
  - /node_modules/graphql/validation/rules/KnownArgumentNamesRule.mjs
  - /node_modules/graphql/validation/rules/KnownDirectivesRule.mjs
  - /node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs
  - /node_modules/graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs
  - /node_modules/graphql/execution/collectFields.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/observables/Concast.js
bundle space:    0.14 %
rendered size:   4.748 KB
original size:   4.93 KB
code reduction:  3.69 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-transition-group/esm/utils/ChildMapping.js
bundle space:    0.14 %
rendered size:   4.672 KB
original size:   4.71 KB
code reduction:  0.81 %
dependents:      1
  - /node_modules/react-transition-group/esm/TransitionGroup.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@emotion/sheet/dist/emotion-sheet.esm.js
bundle space:    0.14 %
rendered size:   4.65 KB
original size:   4.675 KB
code reduction:  0.53 %
dependents:      1
  - /node_modules/@emotion/cache/dist/emotion-cache.esm.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/domain/react-payment-inputs/react-payment-inputs.utils.ts
bundle space:    0.14 %
rendered size:   4.615 KB
original size:   4.588 KB
code reduction:  0 %
dependents:      4
  - /src/utils/validationUtils.ts
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.tsx
  - /src/domain/payment/payment.utils.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/StepIcon/StepIcon.js
bundle space:    0.14 %
rendered size:   4.613 KB
original size:   4.847 KB
code reduction:  4.83 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.mjs
bundle space:    0.14 %
rendered size:   4.6 KB
original size:   4.816 KB
code reduction:  4.49 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/modifiers/flip.js
bundle space:    0.14 %
rendered size:   4.584 KB
original size:   4.908 KB
code reduction:  6.6 %
dependents:      1
  - /node_modules/@popperjs/core/lib/popper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/KnownDirectivesRule.mjs
bundle space:    0.14 %
rendered size:   4.546 KB
original size:   4.404 KB
code reduction:  0 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Stepper/Stepper.js
bundle space:    0.14 %
rendered size:   4.528 KB
original size:   4.693 KB
code reduction:  3.52 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/styles/experimental_extendTheme.js
bundle space:    0.14 %
rendered size:   4.515 KB
original size:   4.581 KB
code reduction:  1.44 %
dependents:      1
  - /node_modules/@mui/material/styles/CssVarsProvider.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/stylis/src/Tokenizer.js
bundle space:    0.14 %
rendered size:   4.511 KB
original size:   4.723 KB
code reduction:  4.49 %
dependents:      2
  - /node_modules/stylis/src/Parser.js
  - /node_modules/stylis/src/Middleware.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/hooks/useCreateInvoiceAndReservation.ts
bundle space:    0.14 %
rendered size:   4.506 KB
original size:   4.63 KB
code reduction:  2.68 %
dependents:      1
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/OptionUnstyled/OptionUnstyled.js
bundle space:    0.13 %
rendered size:   4.48 KB
original size:   4.95 KB
code reduction:  9.49 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ListSubheader/ListSubheader.js
bundle space:    0.13 %
rendered size:   4.466 KB
original size:   4.605 KB
code reduction:  3.02 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/domain/payment/payment.utils.ts
bundle space:    0.13 %
rendered size:   4.451 KB
original size:   3.569 KB
code reduction:  0 %
dependents:      4
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.tsx
  - /src/hooks/useLimits.ts
  - /src/components/shared/Icons/Icons.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/utilities/astFromValue.mjs
bundle space:    0.13 %
rendered size:   4.442 KB
original size:   4.717 KB
code reduction:  5.83 %
dependents:      2
  - /node_modules/graphql/type/introspection.mjs
  - /node_modules/graphql/utilities/findBreakingChanges.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/utils/storageUtils.ts
bundle space:    0.13 %
rendered size:   4.428 KB
original size:   5.447 KB
code reduction:  18.71 %
dependents:      1
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.utils.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/CardMedia/CardMedia.js
bundle space:    0.13 %
rendered size:   4.423 KB
original size:   4.573 KB
code reduction:  3.28 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/SpeedDialIcon/SpeedDialIcon.js
bundle space:    0.13 %
rendered size:   4.41 KB
original size:   4.58 KB
code reduction:  3.71 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.js
bundle space:    0.13 %
rendered size:   4.407 KB
original size:   4.544 KB
code reduction:  3.01 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/useMediaQuery/useMediaQuery.js
bundle space:    0.13 %
rendered size:   4.332 KB
original size:   4.407 KB
code reduction:  1.7 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TableRow/TableRow.js
bundle space:    0.13 %
rendered size:   4.307 KB
original size:   4.497 KB
code reduction:  4.23 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-transition-group/esm/ReplaceTransition.js
bundle space:    0.13 %
rendered size:   4.301 KB
original size:   4.442 KB
code reduction:  3.17 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/react/parser/index.js
bundle space:    0.13 %
rendered size:   4.283 KB
original size:   4.23 KB
code reduction:  0 %
dependents:      2
  - /node_modules/@apollo/client/react/hooks/useMutation.js
  - /node_modules/@apollo/client/react/hooks/useQuery.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql-tag/lib/index.js
bundle space:    0.13 %
rendered size:   4.253 KB
original size:   4.382 KB
code reduction:  2.94 %
dependents:      1
  - /node_modules/@apollo/client/core/index.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/TabUnstyled/TabUnstyled.js
bundle space:    0.13 %
rendered size:   4.237 KB
original size:   4.282 KB
code reduction:  1.05 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/NativeSelect/NativeSelect.js
bundle space:    0.13 %
rendered size:   4.232 KB
original size:   4.503 KB
code reduction:  6.02 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/SavedItem/SavedItem.tsx
bundle space:    0.13 %
rendered size:   4.23 KB
original size:   4.893 KB
code reduction:  13.55 %
dependents:      2
  - /src/components/payments/BillingInfo/Item/BillingInfoItem.tsx
  - /src/components/payments/PaymentDetailsItem/Item/PaymentDetailsItem.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs
bundle space:    0.13 %
rendered size:   4.198 KB
original size:   4.497 KB
code reduction:  6.65 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/cache/inmemory/object-canon.js
bundle space:    0.13 %
rendered size:   4.169 KB
original size:   4.414 KB
code reduction:  5.55 %
dependents:      4
  - /node_modules/@apollo/client/cache/inmemory/inMemoryCache.js
  - /node_modules/@apollo/client/cache/inmemory/policies.js
  - /node_modules/@apollo/client/cache/inmemory/readFromStore.js
  - /node_modules/@apollo/client/cache/inmemory/writeToStore.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/TabsUnstyled/TabsUnstyled.js
bundle space:    0.13 %
rendered size:   4.168 KB
original size:   4.196 KB
code reduction:  0.67 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/BottomNavigation/BottomNavigation.js
bundle space:    0.13 %
rendered size:   4.165 KB
original size:   4.315 KB
code reduction:  3.48 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Table/Table.js
bundle space:    0.12 %
rendered size:   4.034 KB
original size:   4.113 KB
code reduction:  1.92 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.js
bundle space:    0.12 %
rendered size:   4.032 KB
original size:   4.084 KB
code reduction:  1.27 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/react/hooks/useMutation.js
bundle space:    0.12 %
rendered size:   4.015 KB
original size:   4.289 KB
code reduction:  6.39 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/SnackbarContent/SnackbarContent.js
bundle space:    0.12 %
rendered size:   4.008 KB
original size:   4.25 KB
code reduction:  5.69 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/merge-options/index.js
bundle space:    0.12 %
rendered size:   4 KB
original size:   4.001 KB
code reduction:  0.02 %
dependents:      1
  - /node_modules/merge-options/index.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/execution/values.mjs
bundle space:    0.12 %
rendered size:   3.952 KB
original size:   7.667 KB
code reduction:  48.45 %
dependents:      2
  - /node_modules/graphql/utilities/extendSchema.mjs
  - /node_modules/graphql/execution/collectFields.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/StepConnector/StepConnector.js
bundle space:    0.12 %
rendered size:   3.916 KB
original size:   4.202 KB
code reduction:  6.81 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/core/ApolloLink.js
bundle space:    0.12 %
rendered size:   3.858 KB
original size:   3.989 KB
code reduction:  3.28 %
dependents:      5
  - /node_modules/@apollo/client/link/core/empty.js
  - /node_modules/@apollo/client/link/core/from.js
  - /node_modules/@apollo/client/link/core/split.js
  - /node_modules/@apollo/client/link/core/concat.js
  - /node_modules/@apollo/client/link/core/execute.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/graphql/getFromAST.js
bundle space:    0.12 %
rendered size:   3.852 KB
original size:   3.904 KB
code reduction:  1.33 %
dependents:      1
  - /node_modules/@apollo/client/utilities/graphql/transform.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs
bundle space:    0.12 %
rendered size:   3.842 KB
original size:   4.122 KB
code reduction:  6.79 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Hidden/HiddenJs.js
bundle space:    0.12 %
rendered size:   3.828 KB
original size:   3.594 KB
code reduction:  0 %
dependents:      1
  - /node_modules/@mui/material/Hidden/Hidden.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/List/List.js
bundle space:    0.11 %
rendered size:   3.8 KB
original size:   3.977 KB
code reduction:  4.45 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.mjs
bundle space:    0.11 %
rendered size:   3.776 KB
original size:   4.017 KB
code reduction:  6 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/execution/collectFields.mjs
bundle space:    0.11 %
rendered size:   3.692 KB
original size:   4.751 KB
code reduction:  22.29 %
dependents:      1
  - /node_modules/graphql/validation/rules/SingleFieldSubscriptionsRule.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Toolbar/Toolbar.js
bundle space:    0.11 %
rendered size:   3.69 KB
original size:   3.793 KB
code reduction:  2.72 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Hidden/withWidth.js
bundle space:    0.11 %
rendered size:   3.688 KB
original size:   4.115 KB
code reduction:  10.38 %
dependents:      1
  - /node_modules/@mui/material/Hidden/HiddenJs.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/StepButton/StepButton.js
bundle space:    0.11 %
rendered size:   3.686 KB
original size:   3.974 KB
code reduction:  7.25 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TabScrollButton/TabScrollButton.js
bundle space:    0.11 %
rendered size:   3.68 KB
original size:   4.061 KB
code reduction:  9.38 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/ListboxUnstyled/useControllableReducer.js
bundle space:    0.11 %
rendered size:   3.659 KB
original size:   3.698 KB
code reduction:  1.05 %
dependents:      1
  - /node_modules/@mui/base/ListboxUnstyled/useListbox.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/breakpoints.js
bundle space:    0.11 %
rendered size:   3.656 KB
original size:   5.208 KB
code reduction:  29.8 %
dependents:      6
  - /node_modules/@mui/system/esm/borders.js
  - /node_modules/@mui/system/esm/grid.js
  - /node_modules/@mui/system/esm/sizing.js
  - /node_modules/@mui/system/esm/spacing.js
  - /node_modules/@mui/system/esm/style.js
  - /node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/usePagination/usePagination.js
bundle space:    0.11 %
rendered size:   3.645 KB
original size:   3.858 KB
code reduction:  5.52 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/jsutils/suggestionList.mjs
bundle space:    0.11 %
rendered size:   3.635 KB
original size:   3.683 KB
code reduction:  1.3 %
dependents:      6
  - /node_modules/graphql/type/definition.mjs
  - /node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.mjs
  - /node_modules/graphql/validation/rules/KnownArgumentNamesRule.mjs
  - /node_modules/graphql/validation/rules/KnownTypeNamesRule.mjs
  - /node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.mjs
  - /node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.js
bundle space:    0.11 %
rendered size:   3.594 KB
original size:   3.742 KB
code reduction:  3.96 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/CardActionArea/CardActionArea.js
bundle space:    0.11 %
rendered size:   3.583 KB
original size:   3.838 KB
code reduction:  6.64 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-payment-inputs/es/PaymentInputsWrapper.js
bundle space:    0.11 %
rendered size:   3.501 KB
original size:   4.654 KB
code reduction:  24.77 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/cache/core/cache.js
bundle space:    0.11 %
rendered size:   3.497 KB
original size:   3.579 KB
code reduction:  2.29 %
dependents:      1
  - /node_modules/@apollo/client/cache/inmemory/inMemoryCache.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/styles/createTransitions.js
bundle space:    0.1 %
rendered size:   3.474 KB
original size:   3.62 KB
code reduction:  4.03 %
dependents:      2
  - /node_modules/@mui/material/styles/createTheme.js
  - /node_modules/@mui/material/Collapse/Collapse.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/hooks/useLimits.ts
bundle space:    0.1 %
rendered size:   3.447 KB
original size:   3.769 KB
code reduction:  8.54 %
dependents:      2
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/modifiers/arrow.js
bundle space:    0.1 %
rendered size:   3.414 KB
original size:   3.942 KB
code reduction:  13.39 %
dependents:      1
  - /node_modules/@popperjs/core/lib/popper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/language/blockString.mjs
bundle space:    0.1 %
rendered size:   3.393 KB
original size:   4.824 KB
code reduction:  29.66 %
dependents:      2
  - /node_modules/graphql/language/lexer.mjs
  - /node_modules/graphql/language/printer.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/Select/StateSelector/StateSelector.tsx
bundle space:    0.1 %
rendered size:   3.306 KB
original size:   3.73 KB
code reduction:  11.37 %
dependents:      1
  - /src/forms/BillingInfoForm.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/validateModifiers.js
bundle space:    0.1 %
rendered size:   3.266 KB
original size:   3.261 KB
code reduction:  0 %
dependents:      1
  - /node_modules/@popperjs/core/lib/createPopper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/OutlinedInput/NotchedOutline.js
bundle space:    0.1 %
rendered size:   3.257 KB
original size:   3.353 KB
code reduction:  2.86 %
dependents:      1
  - /node_modules/@mui/material/OutlinedInput/OutlinedInput.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/views/Error/ErrorView.tsx
bundle space:    0.1 %
rendered size:   3.159 KB
original size:   3.768 KB
code reduction:  16.16 %
dependents:      2
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/components/public/ErrorOverlay/StaticErrorOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js
bundle space:    0.09 %
rendered size:   3.131 KB
original size:   3.319 KB
code reduction:  5.66 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/styles/createTypography.js
bundle space:    0.09 %
rendered size:   3.1 KB
original size:   3.272 KB
code reduction:  5.26 %
dependents:      2
  - /node_modules/@mui/material/styles/createTheme.js
  - /node_modules/@mui/material/styles/CssVarsProvider.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.js
bundle space:    0.09 %
rendered size:   3.1 KB
original size:   3.312 KB
code reduction:  6.4 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-payment-inputs/es/utils/cardTypes-4f45f8d3.js
bundle space:    0.09 %
rendered size:   3.096 KB
original size:   3.267 KB
code reduction:  5.23 %
dependents:      4
  - /node_modules/react-payment-inputs/es/usePaymentInputs.js
  - /node_modules/react-payment-inputs/es/utils/validator-0f41e23d.js
  - /node_modules/react-payment-inputs/es/utils/formatter-b0b2372d.js
  - /node_modules/react-payment-inputs/es/utils/index.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/country-codes-list/index.js
bundle space:    0.09 %
rendered size:   3.053 KB
original size:   3.039 KB
code reduction:  0 %
dependents:      1
  - /src/domain/circle/circle.utils.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/config/config.ts
bundle space:    0.09 %
rendered size:   3.006 KB
original size:   3.19 KB
code reduction:  5.77 %
dependents:      10
  - /src/index.ts
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.utils.ts
  - /src/components/public/SuccessOverlay/SuccessOverlay.tsx
  - /src/components/public/ErrorOverlay/ErrorOverlay.tsx
  - /src/hooks/useContdown.ts
  - /src/views/Purchasing/PurchasingView.tsx
  - /src/views/Error/ErrorView.tsx
  - /src/components/payments/CheckoutModalHeader/CheckoutModalHeader.tsx
  - /src/hooks/useCreatePaymentMethod.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.tsx
bundle space:    0.09 %
rendered size:   2.996 KB
original size:   3.874 KB
code reduction:  22.66 %
dependents:      1
  - /src/views/Confirmation/ConfirmationView.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/FormGroup/FormGroup.js
bundle space:    0.09 %
rendered size:   2.961 KB
original size:   3.25 KB
code reduction:  8.89 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.js
bundle space:    0.09 %
rendered size:   2.961 KB
original size:   3.193 KB
code reduction:  7.27 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/CheckoutItemCost/List/CheckoutItemList.tsx
bundle space:    0.09 %
rendered size:   2.96 KB
original size:   2.787 KB
code reduction:  0 %
dependents:      2
  - /src/components/payments/PurchaseConfirmationItemDetails/PurchaseConfirmationItemDetails.tsx
  - /src/components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-payment-inputs/es/chunk-7eee66c0.js
bundle space:    0.09 %
rendered size:   2.956 KB
original size:   3.506 KB
code reduction:  15.69 %
dependents:      4
  - /node_modules/react-payment-inputs/es/usePaymentInputs.js
  - /node_modules/react-payment-inputs/es/PaymentInputsWrapper.js
  - /node_modules/react-payment-inputs/es/utils/formatter-b0b2372d.js
  - /node_modules/react-payment-inputs/es/utils/index.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/DialogContent/DialogContent.js
bundle space:    0.09 %
rendered size:   2.943 KB
original size:   3.195 KB
code reduction:  7.89 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/VariablesInAllowedPositionRule.mjs
bundle space:    0.09 %
rendered size:   2.908 KB
original size:   3.172 KB
code reduction:  8.32 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ListItemSecondaryAction/ListItemSecondaryAction.js
bundle space:    0.09 %
rendered size:   2.905 KB
original size:   3.172 KB
code reduction:  8.42 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/detectOverflow.js
bundle space:    0.09 %
rendered size:   2.897 KB
original size:   3.389 KB
code reduction:  14.52 %
dependents:      5
  - /node_modules/@popperjs/core/lib/createPopper.js
  - /node_modules/@popperjs/core/lib/modifiers/flip.js
  - /node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
  - /node_modules/@popperjs/core/lib/modifiers/hide.js
  - /node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.js
bundle space:    0.09 %
rendered size:   2.893 KB
original size:   3.154 KB
code reduction:  8.28 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/domain/dictionary/dictionary.constants.tsx
bundle space:    0.09 %
rendered size:   2.888 KB
original size:   2.349 KB
code reduction:  0 %
dependents:      1
  - /src/providers/DictionaryProvider.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/Select/WalletAddressSelector/WalletAddressSelector.tsx
bundle space:    0.09 %
rendered size:   2.884 KB
original size:   3.226 KB
code reduction:  10.6 %
dependents:      1
  - /src/components/payments/DeliveryWallet/DeliveryWalletSelector/DeliveryWalletSelector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/RadioGroup/RadioGroup.js
bundle space:    0.09 %
rendered size:   2.872 KB
original size:   3.172 KB
code reduction:  9.46 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/KnownArgumentNamesRule.mjs
bundle space:    0.09 %
rendered size:   2.855 KB
original size:   3.077 KB
code reduction:  7.21 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ListItemIcon/ListItemIcon.js
bundle space:    0.09 %
rendered size:   2.85 KB
original size:   3.088 KB
code reduction:  7.71 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Hidden/Hidden.js
bundle space:    0.09 %
rendered size:   2.84 KB
original size:   3.999 KB
code reduction:  28.98 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/graphql/directives.js
bundle space:    0.09 %
rendered size:   2.83 KB
original size:   2.899 KB
code reduction:  2.38 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/SavedBillingDetailsSelector/SavedBillingDetailsSelector.tsx
bundle space:    0.08 %
rendered size:   2.81 KB
original size:   3.58 KB
code reduction:  21.51 %
dependents:      1
  - /src/views/Billing/BillingView.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/AccordionActions/AccordionActions.js
bundle space:    0.08 %
rendered size:   2.781 KB
original size:   2.982 KB
code reduction:  6.74 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/DialogActions/DialogActions.js
bundle space:    0.08 %
rendered size:   2.774 KB
original size:   2.969 KB
code reduction:  6.57 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/util/createValidation.js
bundle space:    0.08 %
rendered size:   2.773 KB
original size:   2.832 KB
code reduction:  2.08 %
dependents:      1
  - /node_modules/yup/es/schema.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
bundle space:    0.08 %
rendered size:   2.763 KB
original size:   3.301 KB
code reduction:  16.3 %
dependents:      1
  - /node_modules/@popperjs/core/lib/utils/detectOverflow.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/public/ErrorOverlay/ErrorOverlay.tsx
bundle space:    0.08 %
rendered size:   2.757 KB
original size:   3.337 KB
code reduction:  17.38 %
dependents:      1
  - /src/index.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/Select/CountrySelector/CountrySelector.tsx
bundle space:    0.08 %
rendered size:   2.74 KB
original size:   3.105 KB
code reduction:  11.76 %
dependents:      1
  - /src/forms/BillingInfoForm.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/ReadOnlyField/ReadOnlyField.tsx
bundle space:    0.08 %
rendered size:   2.733 KB
original size:   2.835 KB
code reduction:  3.6 %
dependents:      2
  - /src/components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.tsx
  - /src/components/payments/DeliveryWallet/DeliveryWalletDetails/DeliveryWalletDetails.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TableFooter/TableFooter.js
bundle space:    0.08 %
rendered size:   2.713 KB
original size:   2.952 KB
code reduction:  8.1 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/SwitchUnstyled/useSwitch.js
bundle space:    0.08 %
rendered size:   2.713 KB
original size:   2.897 KB
code reduction:  6.35 %
dependents:      1
  - /node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ListItemAvatar/ListItemAvatar.js
bundle space:    0.08 %
rendered size:   2.712 KB
original size:   2.954 KB
code reduction:  8.19 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/CardActions/CardActions.js
bundle space:    0.08 %
rendered size:   2.706 KB
original size:   2.897 KB
code reduction:  6.59 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TableHead/TableHead.js
bundle space:    0.08 %
rendered size:   2.693 KB
original size:   2.928 KB
code reduction:  8.03 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TableBody/TableBody.js
bundle space:    0.08 %
rendered size:   2.69 KB
original size:   2.925 KB
code reduction:  8.03 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/ProvidersInjector/ProvidersInjector.tsx
bundle space:    0.08 %
rendered size:   2.677 KB
original size:   3.225 KB
code reduction:  16.99 %
dependents:      4
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/components/public/SuccessOverlay/SuccessOverlay.tsx
  - /src/components/public/ErrorOverlay/ErrorOverlay.tsx
  - /src/components/public/PlaidOverlay/PlaidOverlay.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/utilities/typeComparators.mjs
bundle space:    0.08 %
rendered size:   2.664 KB
original size:   3.273 KB
code reduction:  18.61 %
dependents:      2
  - /node_modules/graphql/validation/rules/PossibleFragmentSpreadsRule.mjs
  - /node_modules/graphql/validation/rules/VariablesInAllowedPositionRule.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ScopedCssBaseline/ScopedCssBaseline.js
bundle space:    0.08 %
rendered size:   2.655 KB
original size:   3.031 KB
code reduction:  12.41 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Container/Container.js
bundle space:    0.08 %
rendered size:   2.648 KB
original size:   2.531 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/PaymentDetailsItem/Item/PaymentDetailsItem.tsx
bundle space:    0.08 %
rendered size:   2.642 KB
original size:   2.842 KB
code reduction:  7.04 %
dependents:      1
  - /src/components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/common/mergeDeep.js
bundle space:    0.08 %
rendered size:   2.636 KB
original size:   2.756 KB
code reduction:  4.35 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/Portal/Portal.js
bundle space:    0.08 %
rendered size:   2.605 KB
original size:   2.682 KB
code reduction:  2.87 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/styles/createTheme.js
bundle space:    0.08 %
rendered size:   2.577 KB
original size:   3.416 KB
code reduction:  24.56 %
dependents:      2
  - /node_modules/@mui/material/styles/experimental_extendTheme.js
  - /node_modules/@mui/material/styles/defaultTheme.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Card/Card.js
bundle space:    0.08 %
rendered size:   2.571 KB
original size:   2.812 KB
code reduction:  8.57 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/utils/animationUtils.ts
bundle space:    0.08 %
rendered size:   2.566 KB
original size:   2.6 KB
code reduction:  1.31 %
dependents:      1
  - /src/components/shared/FullScreenOverlay/FullScreenOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/specifiedRules.mjs
bundle space:    0.08 %
rendered size:   2.554 KB
original size:   5.668 KB
code reduction:  54.94 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/cache/inmemory/helpers.js
bundle space:    0.08 %
rendered size:   2.541 KB
original size:   2.708 KB
code reduction:  6.17 %
dependents:      7
  - /node_modules/@apollo/client/cache/inmemory/entityStore.js
  - /node_modules/@apollo/client/cache/inmemory/inMemoryCache.js
  - /node_modules/@apollo/client/cache/inmemory/policies.js
  - /node_modules/@apollo/client/cache/inmemory/object-canon.js
  - /node_modules/@apollo/client/cache/inmemory/readFromStore.js
  - /node_modules/@apollo/client/cache/inmemory/writeToStore.js
  - /node_modules/@apollo/client/cache/inmemory/key-extractor.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/SingleFieldSubscriptionsRule.mjs
bundle space:    0.08 %
rendered size:   2.538 KB
original size:   2.678 KB
code reduction:  5.23 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/domain/errors/errors.constants.ts
bundle space:    0.08 %
rendered size:   2.535 KB
original size:   3.179 KB
code reduction:  20.26 %
dependents:      10
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/components/public/ErrorOverlay/ErrorOverlay.tsx
  - /src/hooks/useCreateInvoiceAndReservation.ts
  - /src/hooks/useContdown.ts
  - /src/domain/circle/circle.utils.ts
  - /src/views/Purchasing/PurchasingView.tsx
  - /src/views/Error/ErrorView.tsx
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.hooks.ts
  - /src/hooks/useFullPayment.ts
  - /src/forms/BillingInfoForm.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/views/Confirmation/ConfirmationView.tsx
bundle space:    0.08 %
rendered size:   2.517 KB
original size:   3.54 KB
code reduction:  28.9 %
dependents:      1
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/jsutils/inspect.mjs
bundle space:    0.08 %
rendered size:   2.504 KB
original size:   2.512 KB
code reduction:  0.32 %
dependents:      20
  - /node_modules/graphql/type/definition.mjs
  - /node_modules/graphql/type/directives.mjs
  - /node_modules/graphql/type/scalars.mjs
  - /node_modules/graphql/type/introspection.mjs
  - /node_modules/graphql/language/source.mjs
  - /node_modules/graphql/language/visitor.mjs
  - /node_modules/graphql/execution/values.mjs
  - /node_modules/graphql/utilities/extendSchema.mjs
  - /node_modules/graphql/utilities/valueFromAST.mjs
  - /node_modules/graphql/utilities/astFromValue.mjs
  - /node_modules/graphql/utilities/findBreakingChanges.mjs
  - /node_modules/graphql/validation/rules/KnownDirectivesRule.mjs
  - /node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs
  - /node_modules/graphql/validation/rules/PossibleFragmentSpreadsRule.mjs
  - /node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs
  - /node_modules/graphql/validation/rules/ScalarLeafsRule.mjs
  - /node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.mjs
  - /node_modules/graphql/validation/rules/VariablesInAllowedPositionRule.mjs
  - /node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs
  - /node_modules/graphql/jsutils/instanceOf.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/graphql/fragments.js
bundle space:    0.08 %
rendered size:   2.491 KB
original size:   2.574 KB
code reduction:  3.22 %
dependents:      2
  - /node_modules/@apollo/client/utilities/graphql/storeUtils.js
  - /node_modules/@apollo/client/utilities/graphql/transform.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/CardContent/CardContent.js
bundle space:    0.07 %
rendered size:   2.478 KB
original size:   2.68 KB
code reduction:  7.54 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/config/theme/themePalette.ts
bundle space:    0.07 %
rendered size:   2.469 KB
original size:   2.316 KB
code reduction:  0 %
dependents:      1
  - /src/config/theme/theme.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TableContainer/TableContainer.js
bundle space:    0.07 %
rendered size:   2.469 KB
original size:   2.677 KB
code reduction:  7.77 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
bundle space:    0.07 %
rendered size:   2.458 KB
original size:   2.608 KB
code reduction:  5.75 %
dependents:      5
  - /node_modules/@popperjs/core/lib/createPopper.js
  - /node_modules/@popperjs/core/lib/modifiers/computeStyles.js
  - /node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
  - /node_modules/@popperjs/core/lib/modifiers/arrow.js
  - /node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs
bundle space:    0.07 %
rendered size:   2.436 KB
original size:   2.652 KB
code reduction:  8.14 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Hidden/HiddenCss.js
bundle space:    0.07 %
rendered size:   2.435 KB
original size:   4.956 KB
code reduction:  50.87 %
dependents:      1
  - /node_modules/@mui/material/Hidden/Hidden.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/DialogTitle/DialogTitle.js
bundle space:    0.07 %
rendered size:   2.413 KB
original size:   2.686 KB
code reduction:  10.16 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/grid.js
bundle space:    0.07 %
rendered size:   2.408 KB
original size:   2.509 KB
code reduction:  4.03 %
dependents:      1
  - /node_modules/@mui/system/esm/getThemeValue.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/createTheme/createBreakpoints.js
bundle space:    0.07 %
rendered size:   2.387 KB
original size:   2.698 KB
code reduction:  11.53 %
dependents:      1
  - /node_modules/@mui/system/esm/createTheme/createTheme.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/modifiers/applyStyles.js
bundle space:    0.07 %
rendered size:   2.386 KB
original size:   2.527 KB
code reduction:  5.58 %
dependents:      1
  - /node_modules/@popperjs/core/lib/popper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/MenuItemUnstyled/useMenuItem.js
bundle space:    0.07 %
rendered size:   2.362 KB
original size:   2.505 KB
code reduction:  5.71 %
dependents:      1
  - /node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/NoFragmentCyclesRule.mjs
bundle space:    0.07 %
rendered size:   2.346 KB
original size:   2.403 KB
code reduction:  2.37 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/Container/Container.js
bundle space:    0.07 %
rendered size:   2.333 KB
original size:   2.113 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/UniqueArgumentDefinitionNamesRule.mjs
bundle space:    0.07 %
rendered size:   2.324 KB
original size:   2.426 KB
code reduction:  4.2 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ButtonBase/Ripple.js
bundle space:    0.07 %
rendered size:   2.281 KB
original size:   2.241 KB
code reduction:  0 %
dependents:      1
  - /node_modules/@mui/material/ButtonBase/TouchRipple.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/DeliveryWallet/DeliveryWalletSelector/DeliveryWalletSelector.tsx
bundle space:    0.07 %
rendered size:   2.276 KB
original size:   2.977 KB
code reduction:  23.55 %
dependents:      1
  - /src/components/payments/CheckoutDeliveryAndItemCostBreakdown/CheckoutDeliveryAndItemCostBreakdown.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/AlertTitle/AlertTitle.js
bundle space:    0.07 %
rendered size:   2.269 KB
original size:   2.529 KB
code reduction:  10.28 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/language/kinds.mjs
bundle space:    0.07 %
rendered size:   2.267 KB
original size:   2.246 KB
code reduction:  0 %
dependents:      23
  - /node_modules/graphql/language/parser.mjs
  - /node_modules/graphql/type/definition.mjs
  - /node_modules/graphql/type/scalars.mjs
  - /node_modules/graphql/language/visitor.mjs
  - /node_modules/graphql/language/predicates.mjs
  - /node_modules/graphql/execution/values.mjs
  - /node_modules/graphql/utilities/extendSchema.mjs
  - /node_modules/graphql/utilities/typeFromAST.mjs
  - /node_modules/graphql/utilities/valueFromAST.mjs
  - /node_modules/graphql/utilities/valueFromASTUntyped.mjs
  - /node_modules/graphql/utilities/astFromValue.mjs
  - /node_modules/graphql/validation/rules/ExecutableDefinitionsRule.mjs
  - /node_modules/graphql/validation/rules/KnownArgumentNamesRule.mjs
  - /node_modules/graphql/validation/rules/KnownDirectivesRule.mjs
  - /node_modules/graphql/validation/rules/LoneAnonymousOperationRule.mjs
  - /node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs
  - /node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs
  - /node_modules/graphql/validation/rules/SingleFieldSubscriptionsRule.mjs
  - /node_modules/graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs
  - /node_modules/graphql/validation/rules/VariablesInAllowedPositionRule.mjs
  - /node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs
  - /node_modules/graphql/execution/collectFields.mjs
  - /node_modules/graphql/utilities/sortValueNode.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/DialogContentText/DialogContentText.js
bundle space:    0.07 %
rendered size:   2.249 KB
original size:   2.54 KB
code reduction:  11.46 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/private-theming/ThemeProvider/ThemeProvider.js
bundle space:    0.07 %
rendered size:   2.225 KB
original size:   2.474 KB
code reduction:  10.06 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/locale.js
bundle space:    0.07 %
rendered size:   2.224 KB
original size:   2.31 KB
code reduction:  3.72 %
dependents:      5
  - /node_modules/yup/es/boolean.js
  - /node_modules/yup/es/string.js
  - /node_modules/yup/es/date.js
  - /node_modules/yup/es/object.js
  - /node_modules/yup/es/schema.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/FullScreenOverlay/FullScreenOverlay.tsx
bundle space:    0.07 %
rendered size:   2.215 KB
original size:   2.974 KB
code reduction:  25.52 %
dependents:      3
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/components/public/SuccessOverlay/StaticSuccessOverlay.tsx
  - /src/components/public/ErrorOverlay/StaticErrorOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/AccordionDetails/AccordionDetails.js
bundle space:    0.07 %
rendered size:   2.212 KB
original size:   2.455 KB
code reduction:  9.9 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/jsutils/instanceOf.mjs
bundle space:    0.07 %
rendered size:   2.198 KB
original size:   2.239 KB
code reduction:  1.83 %
dependents:      3
  - /node_modules/graphql/type/definition.mjs
  - /node_modules/graphql/type/directives.mjs
  - /node_modules/graphql/language/source.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/UniqueFieldDefinitionNamesRule.mjs
bundle space:    0.07 %
rendered size:   2.18 KB
original size:   2.292 KB
code reduction:  4.89 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/language/printLocation.mjs
bundle space:    0.07 %
rendered size:   2.178 KB
original size:   2.223 KB
code reduction:  2.02 %
dependents:      1
  - /node_modules/graphql/error/GraphQLError.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/TaxesMessagesBox/TaxesMessagesBox.tsx
bundle space:    0.06 %
rendered size:   2.156 KB
original size:   2.407 KB
code reduction:  10.43 %
dependents:      2
  - /src/forms/BillingInfoForm.tsx
  - /src/components/shared/SavedBillingDetailsSelector/SavedBillingDetailsSelector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/react/hooks/useLazyQuery.js
bundle space:    0.06 %
rendered size:   2.117 KB
original size:   2.32 KB
code reduction:  8.75 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/CopyButton/CopyButton.tsx
bundle space:    0.06 %
rendered size:   2.076 KB
original size:   2.452 KB
code reduction:  15.33 %
dependents:      2
  - /src/components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.tsx
  - /src/components/payments/DeliveryWallet/DeliveryWalletDetails/DeliveryWalletDetails.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/scrollLeft.js
bundle space:    0.06 %
rendered size:   2.073 KB
original size:   2.087 KB
code reduction:  0.67 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/hooks/useCountryOptions.ts
bundle space:    0.06 %
rendered size:   2.056 KB
original size:   2.405 KB
code reduction:  14.51 %
dependents:      2
  - /src/components/shared/Select/CountrySelector/CountrySelector.tsx
  - /src/components/shared/Select/StateSelector/StateSelector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/PossibleFragmentSpreadsRule.mjs
bundle space:    0.06 %
rendered size:   2.036 KB
original size:   2.218 KB
code reduction:  8.21 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Radio/RadioButtonIcon.js
bundle space:    0.06 %
rendered size:   2.019 KB
original size:   2.32 KB
code reduction:  12.97 %
dependents:      1
  - /node_modules/@mui/material/Radio/Radio.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/style.js
bundle space:    0.06 %
rendered size:   2.018 KB
original size:   2.184 KB
code reduction:  7.6 %
dependents:      10
  - /node_modules/@mui/system/esm/borders.js
  - /node_modules/@mui/system/esm/display.js
  - /node_modules/@mui/system/esm/flexbox.js
  - /node_modules/@mui/system/esm/grid.js
  - /node_modules/@mui/system/esm/palette.js
  - /node_modules/@mui/system/esm/positions.js
  - /node_modules/@mui/system/esm/shadows.js
  - /node_modules/@mui/system/esm/sizing.js
  - /node_modules/@mui/system/esm/spacing.js
  - /node_modules/@mui/system/esm/typography.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/PaymentMethodSelector/PaymentMethodSelector.tsx
bundle space:    0.06 %
rendered size:   2.015 KB
original size:   2.687 KB
code reduction:  25.01 %
dependents:      2
  - /src/forms/PaymentMethodForm.tsx
  - /src/hooks/useLimits.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@emotion/utils/dist/emotion-utils.esm.js
bundle space:    0.06 %
rendered size:   1.964 KB
original size:   2.028 KB
code reduction:  3.16 %
dependents:      2
  - /node_modules/@emotion/react/dist/emotion-react.esm.js
  - /node_modules/@emotion/react/dist/emotion-element-570fe3bb.esm.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/stylis/src/Middleware.js
bundle space:    0.06 %
rendered size:   1.95 KB
original size:   3.102 KB
code reduction:  37.14 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-payment-inputs/es/utils/formatter-b0b2372d.js
bundle space:    0.06 %
rendered size:   1.945 KB
original size:   2.15 KB
code reduction:  9.53 %
dependents:      2
  - /node_modules/react-payment-inputs/es/usePaymentInputs.js
  - /node_modules/react-payment-inputs/es/utils/index.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/KnownTypeNamesRule.mjs
bundle space:    0.06 %
rendered size:   1.942 KB
original size:   2.306 KB
code reduction:  15.78 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/CheckoutStepper/CheckoutStepper.tsx
bundle space:    0.06 %
rendered size:   1.935 KB
original size:   1.741 KB
code reduction:  0 %
dependents:      4
  - /src/views/Authentication/AuthenticationView.tsx
  - /src/views/Billing/BillingView.tsx
  - /src/views/Payment/PaymentView.tsx
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.hooks.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/borders.js
bundle space:    0.06 %
rendered size:   1.934 KB
original size:   2.099 KB
code reduction:  7.86 %
dependents:      1
  - /node_modules/@mui/system/esm/getThemeValue.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/stylis/src/Utility.js
bundle space:    0.06 %
rendered size:   1.931 KB
original size:   2.027 KB
code reduction:  4.74 %
dependents:      5
  - /node_modules/stylis/src/Parser.js
  - /node_modules/stylis/src/Prefixer.js
  - /node_modules/stylis/src/Tokenizer.js
  - /node_modules/stylis/src/Serializer.js
  - /node_modules/stylis/src/Middleware.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/utilities/findBreakingChanges.mjs
bundle space:    0.06 %
rendered size:   1.918 KB
original size:   16.614 KB
code reduction:  88.46 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/language/printString.mjs
bundle space:    0.06 %
rendered size:   1.916 KB
original size:   1.924 KB
code reduction:  0.42 %
dependents:      1
  - /node_modules/graphql/language/printer.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/styles/shadows.js
bundle space:    0.06 %
rendered size:   1.915 KB
original size:   1.939 KB
code reduction:  1.24 %
dependents:      1
  - /node_modules/@mui/material/styles/createTheme.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@wry/trie/lib/trie.esm.js
bundle space:    0.06 %
rendered size:   1.889 KB
original size:   1.945 KB
code reduction:  2.88 %
dependents:      4
  - /node_modules/@apollo/client/cache/inmemory/entityStore.js
  - /node_modules/@apollo/client/cache/inmemory/object-canon.js
  - /node_modules/@apollo/client/cache/inmemory/writeToStore.js
  - /node_modules/optimism/lib/bundle.esm.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/modifiers/hide.js
bundle space:    0.06 %
rendered size:   1.884 KB
original size:   1.954 KB
code reduction:  3.58 %
dependents:      1
  - /node_modules/@popperjs/core/lib/popper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/utils/validationUtils.ts
bundle space:    0.06 %
rendered size:   1.869 KB
original size:   2.602 KB
code reduction:  28.17 %
dependents:      7
  - /src/domain/errors/errors.constants.ts
  - /src/forms/BillingInfoForm.tsx
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/payments/CheckoutModalFooter/CheckoutModalFooter.tsx
  - /src/components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.tsx
  - /src/components/shared/TaxesMessagesBox/TaxesMessagesBox.tsx
  - /src/components/payments/DeliveryWallet/DeliveryWalletSelector/DeliveryWalletSelector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@swyg/corre/dist/esm/throttled-callback/throttled-callback.hook.js
bundle space:    0.06 %
rendered size:   1.869 KB
original size:   1.977 KB
code reduction:  5.46 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/observables/asyncMap.js
bundle space:    0.06 %
rendered size:   1.869 KB
original size:   1.95 KB
code reduction:  4.15 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/AuthorizedApolloProvider/AuthorizedApolloProvider.tsx
bundle space:    0.06 %
rendered size:   1.867 KB
original size:   2.014 KB
code reduction:  7.3 %
dependents:      1
  - /src/components/shared/ProvidersInjector/ProvidersInjector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/SwipeableDrawer/SwipeArea.js
bundle space:    0.06 %
rendered size:   1.867 KB
original size:   2.123 KB
code reduction:  12.06 %
dependents:      1
  - /node_modules/@mui/material/SwipeableDrawer/SwipeableDrawer.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/cache/inmemory/reactiveVars.js
bundle space:    0.06 %
rendered size:   1.854 KB
original size:   1.969 KB
code reduction:  5.84 %
dependents:      2
  - /node_modules/@apollo/client/cache/inmemory/inMemoryCache.js
  - /node_modules/@apollo/client/cache/inmemory/policies.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/useControlled.js
bundle space:    0.06 %
rendered size:   1.848 KB
original size:   1.829 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
bundle space:    0.06 %
rendered size:   1.827 KB
original size:   2.023 KB
code reduction:  9.69 %
dependents:      1
  - /node_modules/@popperjs/core/lib/modifiers/flip.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/ts-invariant/lib/invariant.js
bundle space:    0.05 %
rendered size:   1.822 KB
original size:   1.952 KB
code reduction:  6.66 %
dependents:      2
  - /node_modules/@apollo/client/core/index.js
  - /node_modules/@apollo/client/utilities/globals/index.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/UniqueEnumValueNamesRule.mjs
bundle space:    0.05 %
rendered size:   1.822 KB
original size:   1.911 KB
code reduction:  4.66 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/http/selectHttpOptionsAndBody.js
bundle space:    0.05 %
rendered size:   1.804 KB
original size:   2.239 KB
code reduction:  19.43 %
dependents:      1
  - /node_modules/@apollo/client/link/http/createHttpLink.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/Checkbox/Checkbox.tsx
bundle space:    0.05 %
rendered size:   1.796 KB
original size:   2.005 KB
code reduction:  10.42 %
dependents:      2
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/payments/CheckoutModalFooter/CheckoutModalFooter.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/DeliveryWallet/DeliveryWalletDetails/DeliveryWalletDetails.tsx
bundle space:    0.05 %
rendered size:   1.793 KB
original size:   2.068 KB
code reduction:  13.3 %
dependents:      1
  - /src/components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/util/isodate.js
bundle space:    0.05 %
rendered size:   1.785 KB
original size:   1.8 KB
code reduction:  0.83 %
dependents:      1
  - /node_modules/yup/es/date.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/UniqueOperationTypesRule.mjs
bundle space:    0.05 %
rendered size:   1.781 KB
original size:   1.825 KB
code reduction:  2.41 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
bundle space:    0.05 %
rendered size:   1.752 KB
original size:   2.063 KB
code reduction:  15.08 %
dependents:      1
  - /node_modules/@popperjs/core/lib/createPopper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/elementAcceptingRef.js
bundle space:    0.05 %
rendered size:   1.745 KB
original size:   1.803 KB
code reduction:  3.22 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js
bundle space:    0.05 %
rendered size:   1.736 KB
original size:   1.948 KB
code reduction:  10.88 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/ts-invariant/process/index.js
bundle space:    0.05 %
rendered size:   1.726 KB
original size:   1.741 KB
code reduction:  0.86 %
dependents:      1
  - /node_modules/@apollo/client/utilities/globals/fix-graphql.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@swyg/corre/dist/esm/throttled-raf/throttled-raf.hook.js
bundle space:    0.05 %
rendered size:   1.716 KB
original size:   1.825 KB
code reduction:  5.97 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/cssVars/getInitColorSchemeScript.js
bundle space:    0.05 %
rendered size:   1.702 KB
original size:   1.809 KB
code reduction:  5.91 %
dependents:      2
  - /node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js
  - /node_modules/@mui/system/esm/cssVars/useCurrentColorScheme.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Breadcrumbs/BreadcrumbCollapsed.js
bundle space:    0.05 %
rendered size:   1.701 KB
original size:   1.926 KB
code reduction:  11.68 %
dependents:      1
  - /node_modules/@mui/material/Breadcrumbs/Breadcrumbs.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/Reference.js
bundle space:    0.05 %
rendered size:   1.697 KB
original size:   1.818 KB
code reduction:  6.66 %
dependents:      5
  - /node_modules/yup/es/date.js
  - /node_modules/yup/es/schema.js
  - /node_modules/yup/es/util/sortFields.js
  - /node_modules/yup/es/util/createValidation.js
  - /node_modules/yup/es/util/ReferenceSet.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/TabUnstyled/useTab.js
bundle space:    0.05 %
rendered size:   1.693 KB
original size:   1.905 KB
code reduction:  11.13 %
dependents:      1
  - /node_modules/@mui/base/TabUnstyled/TabUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/SelectUnstyled/utils.js
bundle space:    0.05 %
rendered size:   1.692 KB
original size:   1.968 KB
code reduction:  14.02 %
dependents:      2
  - /node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.js
  - /node_modules/@mui/base/SelectUnstyled/SelectUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/ValidationError.js
bundle space:    0.05 %
rendered size:   1.678 KB
original size:   1.754 KB
code reduction:  4.33 %
dependents:      4
  - /node_modules/yup/es/object.js
  - /node_modules/yup/es/schema.js
  - /node_modules/yup/es/util/runTests.js
  - /node_modules/yup/es/util/createValidation.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/getDisplayName.js
bundle space:    0.05 %
rendered size:   1.65 KB
original size:   1.741 KB
code reduction:  5.23 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/DebugBox/DebugBox.tsx
bundle space:    0.05 %
rendered size:   1.649 KB
original size:   1.691 KB
code reduction:  2.48 %
dependents:      4
  - /src/views/Error/ErrorView.tsx
  - /src/forms/BillingInfoForm.tsx
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/date.js
bundle space:    0.05 %
rendered size:   1.639 KB
original size:   1.909 KB
code reduction:  14.14 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Tabs/ScrollbarSize.js
bundle space:    0.05 %
rendered size:   1.631 KB
original size:   1.888 KB
code reduction:  13.61 %
dependents:      1
  - /node_modules/@mui/material/Tabs/Tabs.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@emotion/hash/dist/hash.esm.js
bundle space:    0.05 %
rendered size:   1.622 KB
original size:   1.648 KB
code reduction:  1.58 %
dependents:      1
  - /node_modules/@emotion/serialize/dist/emotion-serialize.esm.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/util/reach.js
bundle space:    0.05 %
rendered size:   1.617 KB
original size:   1.763 KB
code reduction:  8.28 %
dependents:      1
  - /node_modules/yup/es/schema.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/react/hooks/useSyncExternalStore.js
bundle space:    0.05 %
rendered size:   1.61 KB
original size:   1.762 KB
code reduction:  8.63 %
dependents:      1
  - /node_modules/@apollo/client/react/hooks/useQuery.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/elementTypeAcceptingRef.js
bundle space:    0.05 %
rendered size:   1.609 KB
original size:   1.645 KB
code reduction:  2.19 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/hooks/useFormCheckoutError.ts
bundle space:    0.05 %
rendered size:   1.584 KB
original size:   1.901 KB
code reduction:  16.68 %
dependents:      4
  - /src/views/Billing/BillingView.tsx
  - /src/views/Payment/PaymentView.tsx
  - /src/forms/BillingInfoForm.tsx
  - /src/forms/PaymentMethodForm.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/NoSsr/NoSsr.js
bundle space:    0.05 %
rendered size:   1.583 KB
original size:   2.111 KB
code reduction:  25.01 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/Select/Select.tsx
bundle space:    0.05 %
rendered size:   1.559 KB
original size:   1.932 KB
code reduction:  19.31 %
dependents:      4
  - /src/forms/BillingInfoForm.tsx
  - /src/components/shared/Select/CountrySelector/CountrySelector.tsx
  - /src/components/shared/Select/StateSelector/StateSelector.tsx
  - /src/components/shared/Select/WalletAddressSelector/WalletAddressSelector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/computeOffsets.js
bundle space:    0.05 %
rendered size:   1.538 KB
original size:   1.738 KB
code reduction:  11.51 %
dependents:      2
  - /node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
  - /node_modules/@popperjs/core/lib/utils/detectOverflow.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/http/rewriteURIForGET.js
bundle space:    0.05 %
rendered size:   1.535 KB
original size:   1.611 KB
code reduction:  4.72 %
dependents:      1
  - /node_modules/@apollo/client/link/http/createHttpLink.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/CssBaseline/CssBaseline.js
bundle space:    0.05 %
rendered size:   1.527 KB
original size:   3.255 KB
code reduction:  53.09 %
dependents:      1
  - /node_modules/@mui/material/ScopedCssBaseline/ScopedCssBaseline.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/integerPropType.js
bundle space:    0.05 %
rendered size:   1.526 KB
original size:   1.526 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/LoneSchemaDefinitionRule.mjs
bundle space:    0.05 %
rendered size:   1.523 KB
original size:   1.567 KB
code reduction:  2.81 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/util/printValue.js
bundle space:    0.05 %
rendered size:   1.509 KB
original size:   1.524 KB
code reduction:  0.98 %
dependents:      3
  - /node_modules/yup/es/ValidationError.js
  - /node_modules/yup/es/schema.js
  - /node_modules/yup/es/locale.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@swyg/corre/dist/esm/timeout/timeout.hook.js
bundle space:    0.05 %
rendered size:   1.507 KB
original size:   1.593 KB
code reduction:  5.4 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/sizing.js
bundle space:    0.04 %
rendered size:   1.492 KB
original size:   1.646 KB
code reduction:  9.36 %
dependents:      1
  - /node_modules/@mui/system/esm/getThemeValue.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs
bundle space:    0.04 %
rendered size:   1.475 KB
original size:   1.633 KB
code reduction:  9.68 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/modifiers/offset.js
bundle space:    0.04 %
rendered size:   1.472 KB
original size:   1.613 KB
code reduction:  8.74 %
dependents:      1
  - /node_modules/@popperjs/core/lib/popper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/SliderUnstyled/SliderValueLabelUnstyled.js
bundle space:    0.04 %
rendered size:   1.459 KB
original size:   1.541 KB
code reduction:  5.32 %
dependents:      1
  - /node_modules/@mui/base/SliderUnstyled/SliderUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/hooks/useEncryptCard.ts
bundle space:    0.04 %
rendered size:   1.455 KB
original size:   1.752 KB
code reduction:  16.95 %
dependents:      2
  - /src/hooks/useFullPayment.ts
  - /src/hooks/useCreatePaymentMethod.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
bundle space:    0.04 %
rendered size:   1.453 KB
original size:   1.593 KB
code reduction:  8.79 %
dependents:      1
  - /node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/errors/index.js
bundle space:    0.04 %
rendered size:   1.438 KB
original size:   1.611 KB
code reduction:  10.74 %
dependents:      4
  - /node_modules/@apollo/client/core/index.js
  - /node_modules/@apollo/client/core/QueryManager.js
  - /node_modules/@apollo/client/react/hooks/useMutation.js
  - /node_modules/@apollo/client/react/hooks/useQuery.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/utilities/valueFromASTUntyped.mjs
bundle space:    0.04 %
rendered size:   1.437 KB
original size:   1.481 KB
code reduction:  2.97 %
dependents:      1
  - /node_modules/graphql/type/definition.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/StatusIcon/StatusIcon.tsx
bundle space:    0.04 %
rendered size:   1.436 KB
original size:   2.07 KB
code reduction:  30.63 %
dependents:      4
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/views/Purchasing/PurchasingView.tsx
  - /src/views/Error/ErrorView.tsx
  - /src/views/Success/SuccessView.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/Condition.js
bundle space:    0.04 %
rendered size:   1.419 KB
original size:   1.486 KB
code reduction:  4.51 %
dependents:      1
  - /node_modules/yup/es/schema.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/util/runTests.js
bundle space:    0.04 %
rendered size:   1.406 KB
original size:   1.439 KB
code reduction:  2.29 %
dependents:      2
  - /node_modules/yup/es/object.js
  - /node_modules/yup/es/schema.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@swyg/corre/dist/esm/interval/interval.hook.js
bundle space:    0.04 %
rendered size:   1.385 KB
original size:   1.473 KB
code reduction:  5.97 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/public/SuccessOverlay/SuccessOverlay.tsx
bundle space:    0.04 %
rendered size:   1.369 KB
original size:   1.995 KB
code reduction:  31.38 %
dependents:      1
  - /src/index.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/TextField/TextField.tsx
bundle space:    0.04 %
rendered size:   1.349 KB
original size:   1.437 KB
code reduction:  6.12 %
dependents:      8
  - /src/forms/BillingInfoForm.tsx
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/shared/CardNumberField/CardNumberField.tsx
  - /src/components/shared/CardExpiryDateField/CardExpiryDateField.tsx
  - /src/components/shared/CardSecureCodeField/CardSecureCodeField.tsx
  - /src/components/shared/ReadOnlyField/ReadOnlyField.tsx
  - /src/components/payments/DeliveryWallet/DeliveryWalletSelector/DeliveryWalletSelector.tsx
  - /src/components/shared/InlineField/InlineField.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/public/useOpenCloseCheckoutModal/useOpenCloseCheckoutModal.ts
bundle space:    0.04 %
rendered size:   1.339 KB
original size:   1.809 KB
code reduction:  25.98 %
dependents:      1
  - /src/index.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/util/ReferenceSet.js
bundle space:    0.04 %
rendered size:   1.333 KB
original size:   1.353 KB
code reduction:  1.48 %
dependents:      1
  - /node_modules/yup/es/schema.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/language/source.mjs
bundle space:    0.04 %
rendered size:   1.333 KB
original size:   1.46 KB
code reduction:  8.7 %
dependents:      1
  - /node_modules/graphql/language/parser.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/language/directiveLocation.mjs
bundle space:    0.04 %
rendered size:   1.33 KB
original size:   1.309 KB
code reduction:  0 %
dependents:      4
  - /node_modules/graphql/language/parser.mjs
  - /node_modules/graphql/type/directives.mjs
  - /node_modules/graphql/type/introspection.mjs
  - /node_modules/graphql/validation/rules/KnownDirectivesRule.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/NoUnusedVariablesRule.mjs
bundle space:    0.04 %
rendered size:   1.317 KB
original size:   1.374 KB
code reduction:  4.15 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/ScalarLeafsRule.mjs
bundle space:    0.04 %
rendered size:   1.273 KB
original size:   1.402 KB
code reduction:  9.2 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/ConsentText/ConsentText.tsx
bundle space:    0.04 %
rendered size:   1.27 KB
original size:   1.151 KB
code reduction:  0 %
dependents:      2
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/payments/CheckoutModalFooter/CheckoutModalFooter.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/NoUnusedFragmentsRule.mjs
bundle space:    0.04 %
rendered size:   1.268 KB
original size:   1.325 KB
code reduction:  4.3 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/jsutils/naturalCompare.mjs
bundle space:    0.04 %
rendered size:   1.268 KB
original size:   1.276 KB
code reduction:  0.63 %
dependents:      3
  - /node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.mjs
  - /node_modules/graphql/jsutils/suggestionList.mjs
  - /node_modules/graphql/utilities/sortValueNode.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/domain/product/product.utils.ts
bundle space:    0.04 %
rendered size:   1.261 KB
original size:   1.283 KB
code reduction:  1.71 %
dependents:      1
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/Checkbox/CheckboxIconChecked/CheckboxIconChecked.tsx
bundle space:    0.04 %
rendered size:   1.258 KB
original size:   1.422 KB
code reduction:  11.53 %
dependents:      1
  - /src/components/shared/Checkbox/Checkbox.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Box/Box.js
bundle space:    0.04 %
rendered size:   1.258 KB
original size:   1.245 KB
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/language/predicates.mjs
bundle space:    0.04 %
rendered size:   1.256 KB
original size:   2.37 KB
code reduction:  47 %
dependents:      5
  - /node_modules/graphql/utilities/extendSchema.mjs
  - /node_modules/graphql/validation/rules/ExecutableDefinitionsRule.mjs
  - /node_modules/graphql/validation/rules/KnownTypeNamesRule.mjs
  - /node_modules/graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs
  - /node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/modifiers/eventListeners.js
bundle space:    0.04 %
rendered size:   1.242 KB
original size:   1.33 KB
code reduction:  6.62 %
dependents:      1
  - /node_modules/@popperjs/core/lib/popper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/utils/formatUtils.ts
bundle space:    0.04 %
rendered size:   1.241 KB
original size:   1.313 KB
code reduction:  5.48 %
dependents:      8
  - /src/hooks/useContdown.ts
  - /src/domain/circle/circle.utils.ts
  - /src/views/Error/ErrorView.tsx
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.hooks.ts
  - /src/components/payments/CheckoutModalHeader/CheckoutModalHeader.tsx
  - /src/hooks/useCreatePaymentMethod.ts
  - /src/components/shared/FormErrorsBox/FormErrorsBox.tsx
  - /src/components/payments/CheckoutItemCost/Total/CheckoutItemCostTotal.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/http/parseAndCheckHttpResponse.js
bundle space:    0.04 %
rendered size:   1.241 KB
original size:   1.322 KB
code reduction:  6.13 %
dependents:      1
  - /node_modules/@apollo/client/link/http/createHttpLink.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/UniqueTypeNamesRule.mjs
bundle space:    0.04 %
rendered size:   1.241 KB
original size:   1.285 KB
code reduction:  3.42 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/nanoclone/src/index.js
bundle space:    0.04 %
rendered size:   1.231 KB
original size:   1.238 KB
code reduction:  0.57 %
dependents:      1
  - /node_modules/yup/es/schema.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/NoUndefinedVariablesRule.mjs
bundle space:    0.04 %
rendered size:   1.222 KB
original size:   1.279 KB
code reduction:  4.46 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/symbol-observable/es/ponyfill.js
bundle space:    0.04 %
rendered size:   1.178 KB
original size:   1.195 KB
code reduction:  1.42 %
dependents:      1
  - /node_modules/symbol-observable/es/index.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/use-callback-ref/dist/es2015/useRef.js
bundle space:    0.04 %
rendered size:   1.175 KB
original size:   1.211 KB
code reduction:  2.97 %
dependents:      1
  - /node_modules/use-callback-ref/dist/es2015/useMergeRef.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/useId.js
bundle space:    0.04 %
rendered size:   1.174 KB
original size:   1.188 KB
code reduction:  1.18 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/UniqueDirectiveNamesRule.mjs
bundle space:    0.04 %
rendered size:   1.168 KB
original size:   1.212 KB
code reduction:  3.63 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/enums.js
bundle space:    0.04 %
rendered size:   1.167 KB
original size:   1.335 KB
code reduction:  12.58 %
dependents:      14
  - /node_modules/@popperjs/core/lib/createPopper.js
  - /node_modules/@popperjs/core/lib/modifiers/computeStyles.js
  - /node_modules/@popperjs/core/lib/modifiers/offset.js
  - /node_modules/@popperjs/core/lib/modifiers/flip.js
  - /node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
  - /node_modules/@popperjs/core/lib/modifiers/arrow.js
  - /node_modules/@popperjs/core/lib/modifiers/hide.js
  - /node_modules/@popperjs/core/lib/utils/orderModifiers.js
  - /node_modules/@popperjs/core/lib/utils/validateModifiers.js
  - /node_modules/@popperjs/core/lib/utils/getBasePlacement.js
  - /node_modules/@popperjs/core/lib/utils/detectOverflow.js
  - /node_modules/@popperjs/core/lib/utils/computeOffsets.js
  - /node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
  - /node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/config/theme/themeTypography.ts
bundle space:    0.04 %
rendered size:   1.165 KB
original size:   1.11 KB
code reduction:  0 %
dependents:      1
  - /src/config/theme/theme.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/boolean.js
bundle space:    0.04 %
rendered size:   1.162 KB
original size:   1.26 KB
code reduction:  7.78 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.utils.ts
bundle space:    0.03 %
rendered size:   1.142 KB
original size:   1.583 KB
code reduction:  27.86 %
dependents:      1
  - /src/components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/language/characterClasses.mjs
bundle space:    0.03 %
rendered size:   1.128 KB
original size:   1.164 KB
code reduction:  3.09 %
dependents:      3
  - /node_modules/graphql/type/assertName.mjs
  - /node_modules/graphql/language/lexer.mjs
  - /node_modules/graphql/language/blockString.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/orderModifiers.js
bundle space:    0.03 %
rendered size:   1.128 KB
original size:   1.24 KB
code reduction:  9.03 %
dependents:      1
  - /node_modules/@popperjs/core/lib/createPopper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/hooks/useContdown.ts
bundle space:    0.03 %
rendered size:   1.125 KB
original size:   1.718 KB
code reduction:  34.52 %
dependents:      1
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/StackList/StackList.tsx
bundle space:    0.03 %
rendered size:   1.118 KB
original size:   1.98 KB
code reduction:  43.54 %
dependents:      2
  - /src/components/shared/SavedBillingDetailsSelector/SavedBillingDetailsSelector.tsx
  - /src/components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/UniqueVariableNamesRule.mjs
bundle space:    0.03 %
rendered size:   1.108 KB
original size:   1.21 KB
code reduction:  8.43 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/PaymentDetailsItem/Fragment/PaymentDetailsFragment.tsx
bundle space:    0.03 %
rendered size:   1.101 KB
original size:   1.117 KB
code reduction:  1.43 %
dependents:      1
  - /src/components/payments/PaymentDetailsItem/Item/PaymentDetailsItem.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/Box/Box.js
bundle space:    0.03 %
rendered size:   1.097 KB
original size:   980 Bytes
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/CardNumberField/CardNumberField.tsx
bundle space:    0.03 %
rendered size:   1.094 KB
original size:   1.276 KB
code reduction:  14.26 %
dependents:      2
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/shared/ReadOnlyField/ReadOnlyField.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/InputBase/utils.js
bundle space:    0.03 %
rendered size:   1.093 KB
original size:   1.114 KB
code reduction:  1.89 %
dependents:      3
  - /node_modules/@mui/material/FormControl/FormControl.js
  - /node_modules/@mui/material/InputBase/InputBase.js
  - /node_modules/@mui/material/Select/SelectInput.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/UniqueArgumentNamesRule.mjs
bundle space:    0.03 %
rendered size:   1.087 KB
original size:   1.189 KB
code reduction:  8.58 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/type/assertName.mjs
bundle space:    0.03 %
rendered size:   1.08 KB
original size:   1.181 KB
code reduction:  8.55 %
dependents:      2
  - /node_modules/graphql/type/definition.mjs
  - /node_modules/graphql/type/directives.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/domain/url/url.utils.ts
bundle space:    0.03 %
rendered size:   1.075 KB
original size:   1.086 KB
code reduction:  1.01 %
dependents:      8
  - /src/hooks/usePlaid.ts
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.utils.ts
  - /src/components/public/SuccessOverlay/SuccessOverlay.tsx
  - /src/components/public/ErrorOverlay/ErrorOverlay.tsx
  - /src/utils/storageUtils.ts
  - /src/views/Purchasing/PurchasingView.tsx
  - /src/components/shared/AuthorizedApolloProvider/AuthorizedApolloProvider.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/UniqueInputFieldNamesRule.mjs
bundle space:    0.03 %
rendered size:   1.069 KB
original size:   1.173 KB
code reduction:  8.87 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/requirePropFactory.js
bundle space:    0.03 %
rendered size:   1.063 KB
original size:   1.126 KB
code reduction:  5.6 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/createTheme/createSpacing.js
bundle space:    0.03 %
rendered size:   1.045 KB
original size:   1.096 KB
code reduction:  4.65 %
dependents:      1
  - /node_modules/@mui/system/esm/createTheme/createTheme.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js
bundle space:    0.03 %
rendered size:   1.043 KB
original size:   1.251 KB
code reduction:  16.63 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/getThemeValue.js
bundle space:    0.03 %
rendered size:   1.037 KB
original size:   1.337 KB
code reduction:  22.44 %
dependents:      2
  - /node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js
  - /node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
bundle space:    0.03 %
rendered size:   1.016 KB
original size:   1.177 KB
code reduction:  13.68 %
dependents:      2
  - /node_modules/@popperjs/core/lib/createPopper.js
  - /node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-transition-group/esm/utils/PropTypes.js
bundle space:    0.03 %
rendered size:   1.012 KB
original size:   682 Bytes
code reduction:  0 %
dependents:      2
  - /node_modules/react-transition-group/esm/CSSTransition.js
  - /node_modules/react-transition-group/esm/Transition.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/common/cloneDeep.js
bundle space:    0.03 %
rendered size:   1.011 KB
original size:   1.056 KB
code reduction:  4.26 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/domain/errors/exceptions.constants.ts
bundle space:    0.03 %
rendered size:   999 Bytes
original size:   961 Bytes
code reduction:  0 %
dependents:      4
  - /src/views/Error/ErrorView.tsx
  - /src/components/shared/ProvidersInjector/ProvidersInjector.tsx
  - /src/hooks/useCreatePaymentMethod.ts
  - /src/hooks/useEncryptCard.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/BillingInfo/Fragment/BillingInfoFragment.tsx
bundle space:    0.03 %
rendered size:   999 Bytes
original size:   1.137 KB
code reduction:  12.14 %
dependents:      2
  - /src/components/payments/BillingInfo/Item/BillingInfoItem.tsx
  - /src/components/payments/CheckoutItemCost/Purchase/CheckoutItemCostPurchase.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/flexbox.js
bundle space:    0.03 %
rendered size:   995 Bytes
original size:   1.018 KB
code reduction:  2.26 %
dependents:      1
  - /node_modules/@mui/system/esm/getThemeValue.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/language/tokenKind.mjs
bundle space:    0.03 %
rendered size:   995 Bytes
original size:   974 Bytes
code reduction:  0 %
dependents:      2
  - /node_modules/graphql/language/parser.mjs
  - /node_modules/graphql/language/lexer.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/GlobalStyles/GlobalStyles.js
bundle space:    0.03 %
rendered size:   991 Bytes
original size:   1.115 KB
code reduction:  11.12 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/config/theme/theme.ts
bundle space:    0.03 %
rendered size:   987 Bytes
original size:   942 Bytes
code reduction:  0 %
dependents:      2
  - /src/index.ts
  - /src/components/shared/ProvidersInjector/ProvidersInjector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/CheckoutItemCost/Purchase/CheckoutItemCostPurchase.tsx
bundle space:    0.03 %
rendered size:   982 Bytes
original size:   1.441 KB
code reduction:  31.85 %
dependents:      1
  - /src/components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/UniqueOperationNamesRule.mjs
bundle space:    0.03 %
rendered size:   980 Bytes
original size:   1.037 KB
code reduction:  5.5 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/Icons/Icons.tsx
bundle space:    0.03 %
rendered size:   977 Bytes
original size:   1.097 KB
code reduction:  10.94 %
dependents:      4
  - /src/components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.tsx
  - /src/components/shared/Select/Select.tsx
  - /src/components/shared/CardNumberField/CardNumberField.tsx
  - /src/components/payments/PaymentDetailsItem/Fragment/PaymentDetailsFragment.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/stylis/src/Serializer.js
bundle space:    0.03 %
rendered size:   973 Bytes
original size:   1.063 KB
code reduction:  8.47 %
dependents:      1
  - /node_modules/stylis/src/Middleware.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/animate.js
bundle space:    0.03 %
rendered size:   968 Bytes
original size:   983 Bytes
code reduction:  1.53 %
dependents:      1
  - /node_modules/@mui/material/Tabs/Tabs.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/createBox.js
bundle space:    0.03 %
rendered size:   961 Bytes
original size:   1.28 KB
code reduction:  24.92 %
dependents:      1
  - /node_modules/@mui/system/esm/Box/Box.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/config/theme/themeConstants.ts
bundle space:    0.03 %
rendered size:   948 Bytes
original size:   1.009 KB
code reduction:  6.05 %
dependents:      12
  - /src/config/theme/themeComponents.ts
  - /src/views/Purchasing/PurchasingView.tsx
  - /src/views/Error/ErrorView.tsx
  - /src/components/shared/StatusIcon/StatusIcon.tsx
  - /src/forms/BillingInfoForm.tsx
  - /src/views/Success/SuccessView.tsx
  - /src/components/payments/CheckoutModalFooter/CheckoutModalFooter.tsx
  - /src/components/shared/SavedBillingDetailsSelector/SavedBillingDetailsSelector.tsx
  - /src/components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.tsx
  - /src/components/payments/DebugBox/DebugBox.tsx
  - /src/components/payments/DisplayBox/DisplayBox.tsx
  - /src/components/shared/ReadOnlyField/ReadOnlyField.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/public/ErrorBoundary/ErrorBoundary.ts
bundle space:    0.03 %
rendered size:   947 Bytes
original size:   1.047 KB
code reduction:  9.55 %
dependents:      1
  - /src/components/shared/ProvidersInjector/ProvidersInjector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
bundle space:    0.03 %
rendered size:   927 Bytes
original size:   1.227 KB
code reduction:  24.45 %
dependents:      1
  - /node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Grid/gridClasses.js
bundle space:    0.03 %
rendered size:   924 Bytes
original size:   1.011 KB
code reduction:  8.61 %
dependents:      1
  - /node_modules/@mui/material/Grid/Grid.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
bundle space:    0.03 %
rendered size:   921 Bytes
original size:   1.006 KB
code reduction:  8.45 %
dependents:      5
  - /node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
  - /node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
  - /node_modules/@popperjs/core/lib/utils/detectOverflow.js
  - /node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
  - /node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/TabsUnstyled/useTabs.js
bundle space:    0.03 %
rendered size:   915 Bytes
original size:   1.024 KB
code reduction:  10.64 %
dependents:      1
  - /node_modules/@mui/base/TabsUnstyled/TabsUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/BillingInfo/Item/BillingInfoItem.tsx
bundle space:    0.03 %
rendered size:   914 Bytes
original size:   1.133 KB
code reduction:  19.33 %
dependents:      2
  - /src/views/Payment/PaymentView.tsx
  - /src/components/shared/SavedBillingDetailsSelector/SavedBillingDetailsSelector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/styled-engine/index.js
bundle space:    0.03 %
rendered size:   899 Bytes
original size:   1.129 KB
code reduction:  20.37 %
dependents:      4
  - /node_modules/@mui/system/esm/createBox.js
  - /node_modules/@mui/system/esm/createStyled.js
  - /node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js
  - /node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/createTheme/createTheme.js
bundle space:    0.03 %
rendered size:   886 Bytes
original size:   1.155 KB
code reduction:  23.29 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/typography.js
bundle space:    0.03 %
rendered size:   885 Bytes
original size:   927 Bytes
code reduction:  4.53 %
dependents:      1
  - /node_modules/@mui/system/esm/getThemeValue.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/ExecutableDefinitionsRule.mjs
bundle space:    0.03 %
rendered size:   882 Bytes
original size:   1.041 KB
code reduction:  15.27 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/cssVars/createGetCssVar.js
bundle space:    0.03 %
rendered size:   876 Bytes
original size:   891 Bytes
code reduction:  1.68 %
dependents:      1
  - /node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@emotion/unitless/dist/unitless.esm.js
bundle space:    0.03 %
rendered size:   868 Bytes
original size:   899 Bytes
code reduction:  3.45 %
dependents:      1
  - /node_modules/@emotion/serialize/dist/emotion-serialize.esm.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/utils/encryptionUtils.ts
bundle space:    0.03 %
rendered size:   864 Bytes
original size:   966 Bytes
code reduction:  10.56 %
dependents:      1
  - /src/hooks/useEncryptCard.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/propsToClassKey.js
bundle space:    0.03 %
rendered size:   858 Bytes
original size:   995 Bytes
code reduction:  13.77 %
dependents:      1
  - /node_modules/@mui/system/esm/createStyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/utilities/sortValueNode.mjs
bundle space:    0.03 %
rendered size:   856 Bytes
original size:   905 Bytes
code reduction:  5.41 %
dependents:      2
  - /node_modules/graphql/utilities/findBreakingChanges.mjs
  - /node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/LoneAnonymousOperationRule.mjs
bundle space:    0.03 %
rendered size:   847 Bytes
original size:   947 Bytes
code reduction:  10.56 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/FormErrorsBox/FormErrorsBox.tsx
bundle space:    0.03 %
rendered size:   842 Bytes
original size:   861 Bytes
code reduction:  2.21 %
dependents:      2
  - /src/forms/BillingInfoForm.tsx
  - /src/forms/PaymentMethodForm.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/PurchaseConfirmationItemDetails/PurchaseConfirmationItemDetails.tsx
bundle space:    0.03 %
rendered size:   835 Bytes
original size:   1.038 KB
code reduction:  19.56 %
dependents:      1
  - /src/views/Confirmation/ConfirmationView.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Chip/chipClasses.js
bundle space:    0.03 %
rendered size:   833 Bytes
original size:   920 Bytes
code reduction:  9.46 %
dependents:      1
  - /node_modules/@mui/material/Chip/Chip.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/VariablesAreInputTypesRule.mjs
bundle space:    0.03 %
rendered size:   832 Bytes
original size:   1.03 KB
code reduction:  19.22 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/views/Authentication/AuthenticationView.tsx
bundle space:    0.02 %
rendered size:   828 Bytes
original size:   1.483 KB
code reduction:  44.17 %
dependents:      1
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/formatMuiErrorMessage.js
bundle space:    0.02 %
rendered size:   826 Bytes
original size:   841 Bytes
code reduction:  1.78 %
dependents:      1
  - /node_modules/@mui/utils/esm/capitalize.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/UniqueFragmentNamesRule.mjs
bundle space:    0.02 %
rendered size:   826 Bytes
original size:   883 Bytes
code reduction:  6.46 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/deepmerge.js
bundle space:    0.02 %
rendered size:   815 Bytes
original size:   885 Bytes
code reduction:  7.91 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/jsutils/isIterableObject.mjs
bundle space:    0.02 %
rendered size:   811 Bytes
original size:   819 Bytes
code reduction:  0.98 %
dependents:      1
  - /node_modules/graphql/utilities/astFromValue.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/domain/wallet/wallet.utils.ts
bundle space:    0.02 %
rendered size:   810 Bytes
original size:   987 Bytes
code reduction:  17.93 %
dependents:      5
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.hooks.ts
  - /src/hooks/useFullPayment.ts
  - /src/components/payments/DeliveryWallet/DeliveryWalletSelector/DeliveryWalletSelector.tsx
  - /src/components/payments/DeliveryWallet/DeliveryWalletDetails/DeliveryWalletDetails.tsx
  - /src/components/shared/Select/WalletAddressSelector/WalletAddressSelector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.tsx
bundle space:    0.02 %
rendered size:   806 Bytes
original size:   1.21 KB
code reduction:  33.39 %
dependents:      2
  - /src/views/Authentication/AuthenticationView.tsx
  - /src/components/payments/CheckoutDeliveryAndItemCostBreakdown/CheckoutDeliveryAndItemCostBreakdown.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/jsutils/keyMap.mjs
bundle space:    0.02 %
rendered size:   796 Bytes
original size:   804 Bytes
code reduction:  1 %
dependents:      7
  - /node_modules/graphql/type/definition.mjs
  - /node_modules/graphql/execution/values.mjs
  - /node_modules/graphql/utilities/extendSchema.mjs
  - /node_modules/graphql/utilities/valueFromAST.mjs
  - /node_modules/graphql/utilities/findBreakingChanges.mjs
  - /node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs
  - /node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Badge/badgeClasses.js
bundle space:    0.02 %
rendered size:   787 Bytes
original size:   939 Bytes
code reduction:  16.19 %
dependents:      1
  - /node_modules/@mui/material/Badge/Badge.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/common/maybeDeepFreeze.js
bundle space:    0.02 %
rendered size:   773 Bytes
original size:   886 Bytes
code reduction:  12.75 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/CheckoutDeliveryAndItemCostBreakdown/CheckoutDeliveryAndItemCostBreakdown.tsx
bundle space:    0.02 %
rendered size:   767 Bytes
original size:   1.421 KB
code reduction:  46.02 %
dependents:      2
  - /src/views/Billing/BillingView.tsx
  - /src/views/Payment/PaymentView.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/react/context/ApolloProvider.js
bundle space:    0.02 %
rendered size:   765 Bytes
original size:   902 Bytes
code reduction:  15.19 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/exactProp.js
bundle space:    0.02 %
rendered size:   764 Bytes
original size:   827 Bytes
code reduction:  7.62 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/jsutils/didYouMean.mjs
bundle space:    0.02 %
rendered size:   764 Bytes
original size:   772 Bytes
code reduction:  1.04 %
dependents:      6
  - /node_modules/graphql/type/definition.mjs
  - /node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.mjs
  - /node_modules/graphql/validation/rules/KnownArgumentNamesRule.mjs
  - /node_modules/graphql/validation/rules/KnownTypeNamesRule.mjs
  - /node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.mjs
  - /node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/use-callback-ref/dist/es2015/useMergeRef.js
bundle space:    0.02 %
rendered size:   763 Bytes
original size:   838 Bytes
code reduction:  8.95 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Button/buttonClasses.js
bundle space:    0.02 %
rendered size:   758 Bytes
original size:   847 Bytes
code reduction:  10.51 %
dependents:      1
  - /node_modules/@mui/material/Button/Button.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/CardExpiryDateField/CardExpiryDateField.tsx
bundle space:    0.02 %
rendered size:   756 Bytes
original size:   923 Bytes
code reduction:  18.09 %
dependents:      1
  - /src/forms/PaymentMethodForm.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/CardSecureCodeField/CardSecureCodeField.tsx
bundle space:    0.02 %
rendered size:   742 Bytes
original size:   877 Bytes
code reduction:  15.39 %
dependents:      1
  - /src/forms/PaymentMethodForm.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/util/sortFields.js
bundle space:    0.02 %
rendered size:   737 Bytes
original size:   861 Bytes
code reduction:  14.4 %
dependents:      1
  - /node_modules/yup/es/object.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/utils/createOperation.js
bundle space:    0.02 %
rendered size:   727 Bytes
original size:   752 Bytes
code reduction:  3.32 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.js
bundle space:    0.02 %
rendered size:   719 Bytes
original size:   766 Bytes
code reduction:  6.14 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ButtonGroup/buttonGroupClasses.js
bundle space:    0.02 %
rendered size:   714 Bytes
original size:   808 Bytes
code reduction:  11.63 %
dependents:      1
  - /node_modules/@mui/material/ButtonGroup/ButtonGroup.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/InlineField/InlineField.tsx
bundle space:    0.02 %
rendered size:   710 Bytes
original size:   768 Bytes
code reduction:  7.55 %
dependents:      1
  - /src/components/payments/SavedItem/SavedItem.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/views/Success/SuccessView.tsx
bundle space:    0.02 %
rendered size:   708 Bytes
original size:   801 Bytes
code reduction:  11.61 %
dependents:      1
  - /src/components/public/SuccessOverlay/StaticSuccessOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/country-codes-list/utils/supplant.js
bundle space:    0.02 %
rendered size:   706 Bytes
original size:   721 Bytes
code reduction:  2.08 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/country-codes-list/utils/groupBy.js
bundle space:    0.02 %
rendered size:   699 Bytes
original size:   714 Bytes
code reduction:  2.1 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/dom-helpers/esm/removeClass.js
bundle space:    0.02 %
rendered size:   694 Bytes
original size:   709 Bytes
code reduction:  2.12 %
dependents:      1
  - /node_modules/react-transition-group/esm/CSSTransition.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/hooks/useCheckoutItemCostTotal.ts
bundle space:    0.02 %
rendered size:   675 Bytes
original size:   1.046 KB
code reduction:  35.47 %
dependents:      4
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/views/Billing/BillingView.tsx
  - /src/components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.tsx
  - /src/components/payments/CheckoutItemCost/Purchase/CheckoutItemCostPurchase.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
bundle space:    0.02 %
rendered size:   666 Bytes
original size:   706 Bytes
code reduction:  5.67 %
dependents:      1
  - /node_modules/@popperjs/core/lib/popper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/BadgeUnstyled/useBadge.js
bundle space:    0.02 %
rendered size:   663 Bytes
original size:   714 Bytes
code reduction:  7.14 %
dependents:      1
  - /node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/core/networkStatus.js
bundle space:    0.02 %
rendered size:   652 Bytes
original size:   679 Bytes
code reduction:  3.98 %
dependents:      4
  - /node_modules/@apollo/client/core/index.js
  - /node_modules/@apollo/client/core/ObservableQuery.js
  - /node_modules/@apollo/client/core/QueryManager.js
  - /node_modules/@apollo/client/core/QueryInfo.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/clsx/dist/clsx.m.js
bundle space:    0.02 %
rendered size:   649 Bytes
original size:   659 Bytes
code reduction:  1.52 %
dependents:      129
  - /node_modules/@mui/material/Accordion/Accordion.js
  - /node_modules/@mui/material/AccordionActions/AccordionActions.js
  - /node_modules/@mui/material/AccordionDetails/AccordionDetails.js
  - /node_modules/@mui/material/AccordionSummary/AccordionSummary.js
  - /node_modules/@mui/material/Alert/Alert.js
  - /node_modules/@mui/material/AlertTitle/AlertTitle.js
  - /node_modules/@mui/material/AppBar/AppBar.js
  - /node_modules/@mui/material/Autocomplete/Autocomplete.js
  - /node_modules/@mui/material/Avatar/Avatar.js
  - /node_modules/@mui/material/AvatarGroup/AvatarGroup.js
  - /node_modules/@mui/material/Backdrop/Backdrop.js
  - /node_modules/@mui/material/Badge/Badge.js
  - /node_modules/@mui/material/BottomNavigation/BottomNavigation.js
  - /node_modules/@mui/material/BottomNavigationAction/BottomNavigationAction.js
  - /node_modules/@mui/material/Breadcrumbs/Breadcrumbs.js
  - /node_modules/@mui/material/Button/Button.js
  - /node_modules/@mui/material/ButtonBase/ButtonBase.js
  - /node_modules/@mui/material/ButtonGroup/ButtonGroup.js
  - /node_modules/@mui/material/Card/Card.js
  - /node_modules/@mui/material/CardActionArea/CardActionArea.js
  - /node_modules/@mui/material/CardActions/CardActions.js
  - /node_modules/@mui/material/CardContent/CardContent.js
  - /node_modules/@mui/material/CardHeader/CardHeader.js
  - /node_modules/@mui/material/CardMedia/CardMedia.js
  - /node_modules/@mui/material/Chip/Chip.js
  - /node_modules/@mui/material/CircularProgress/CircularProgress.js
  - /node_modules/@mui/material/Collapse/Collapse.js
  - /node_modules/@mui/material/Dialog/Dialog.js
  - /node_modules/@mui/material/DialogActions/DialogActions.js
  - /node_modules/@mui/material/DialogContent/DialogContent.js
  - /node_modules/@mui/material/DialogTitle/DialogTitle.js
  - /node_modules/@mui/material/Divider/Divider.js
  - /node_modules/@mui/material/Drawer/Drawer.js
  - /node_modules/@mui/material/Fab/Fab.js
  - /node_modules/@mui/material/FormControl/FormControl.js
  - /node_modules/@mui/material/FormControlLabel/FormControlLabel.js
  - /node_modules/@mui/material/FormGroup/FormGroup.js
  - /node_modules/@mui/material/FormHelperText/FormHelperText.js
  - /node_modules/@mui/material/FormLabel/FormLabel.js
  - /node_modules/@mui/material/Grid/Grid.js
  - /node_modules/@mui/material/Icon/Icon.js
  - /node_modules/@mui/material/IconButton/IconButton.js
  - /node_modules/@mui/material/ImageList/ImageList.js
  - /node_modules/@mui/material/ImageListItem/ImageListItem.js
  - /node_modules/@mui/material/ImageListItemBar/ImageListItemBar.js
  - /node_modules/@mui/material/InputAdornment/InputAdornment.js
  - /node_modules/@mui/material/InputBase/InputBase.js
  - /node_modules/@mui/material/LinearProgress/LinearProgress.js
  - /node_modules/@mui/material/Link/Link.js
  - /node_modules/@mui/material/List/List.js
  - /node_modules/@mui/material/ListItem/ListItem.js
  - /node_modules/@mui/material/ListItemAvatar/ListItemAvatar.js
  - /node_modules/@mui/material/ListItemButton/ListItemButton.js
  - /node_modules/@mui/material/ListItemIcon/ListItemIcon.js
  - /node_modules/@mui/material/ListItemSecondaryAction/ListItemSecondaryAction.js
  - /node_modules/@mui/material/ListItemText/ListItemText.js
  - /node_modules/@mui/material/ListSubheader/ListSubheader.js
  - /node_modules/@mui/material/Menu/Menu.js
  - /node_modules/@mui/material/MenuItem/MenuItem.js
  - /node_modules/@mui/material/MobileStepper/MobileStepper.js
  - /node_modules/@mui/material/NativeSelect/NativeSelect.js
  - /node_modules/@mui/material/Pagination/Pagination.js
  - /node_modules/@mui/material/PaginationItem/PaginationItem.js
  - /node_modules/@mui/material/Paper/Paper.js
  - /node_modules/@mui/material/Popover/Popover.js
  - /node_modules/@mui/material/Rating/Rating.js
  - /node_modules/@mui/material/ScopedCssBaseline/ScopedCssBaseline.js
  - /node_modules/@mui/material/Select/Select.js
  - /node_modules/@mui/material/Skeleton/Skeleton.js
  - /node_modules/@mui/material/Slider/Slider.js
  - /node_modules/@mui/material/Snackbar/Snackbar.js
  - /node_modules/@mui/material/SnackbarContent/SnackbarContent.js
  - /node_modules/@mui/material/SpeedDial/SpeedDial.js
  - /node_modules/@mui/material/SpeedDialAction/SpeedDialAction.js
  - /node_modules/@mui/material/SpeedDialIcon/SpeedDialIcon.js
  - /node_modules/@mui/material/Step/Step.js
  - /node_modules/@mui/material/StepButton/StepButton.js
  - /node_modules/@mui/material/StepConnector/StepConnector.js
  - /node_modules/@mui/material/StepContent/StepContent.js
  - /node_modules/@mui/material/StepIcon/StepIcon.js
  - /node_modules/@mui/material/StepLabel/StepLabel.js
  - /node_modules/@mui/material/Stepper/Stepper.js
  - /node_modules/@mui/material/SvgIcon/SvgIcon.js
  - /node_modules/@mui/material/Switch/Switch.js
  - /node_modules/@mui/material/Tab/Tab.js
  - /node_modules/@mui/material/Table/Table.js
  - /node_modules/@mui/material/TableBody/TableBody.js
  - /node_modules/@mui/material/TableCell/TableCell.js
  - /node_modules/@mui/material/TableContainer/TableContainer.js
  - /node_modules/@mui/material/TableFooter/TableFooter.js
  - /node_modules/@mui/material/TableHead/TableHead.js
  - /node_modules/@mui/material/TablePagination/TablePagination.js
  - /node_modules/@mui/material/TableRow/TableRow.js
  - /node_modules/@mui/material/TableSortLabel/TableSortLabel.js
  - /node_modules/@mui/material/Tabs/Tabs.js
  - /node_modules/@mui/material/TabScrollButton/TabScrollButton.js
  - /node_modules/@mui/material/TextField/TextField.js
  - /node_modules/@mui/material/ToggleButton/ToggleButton.js
  - /node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js
  - /node_modules/@mui/material/Toolbar/Toolbar.js
  - /node_modules/@mui/material/Tooltip/Tooltip.js
  - /node_modules/@mui/material/Typography/Typography.js
  - /node_modules/@mui/material/ButtonBase/TouchRipple.js
  - /node_modules/@mui/material/internal/SwitchBase.js
  - /node_modules/@mui/material/Hidden/HiddenCss.js
  - /node_modules/@mui/material/NativeSelect/NativeSelectInput.js
  - /node_modules/@mui/material/Select/SelectInput.js
  - /node_modules/@mui/material/SwipeableDrawer/SwipeArea.js
  - /node_modules/@mui/base/ModalUnstyled/ModalUnstyled.js
  - /node_modules/@mui/system/esm/createBox.js
  - /node_modules/@mui/system/esm/Container/createContainer.js
  - /node_modules/@mui/material/ButtonBase/Ripple.js
  - /node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.js
  - /node_modules/@mui/base/SliderUnstyled/SliderUnstyled.js
  - /node_modules/@mui/base/SliderUnstyled/SliderValueLabelUnstyled.js
  - /node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.js
  - /node_modules/@mui/base/FormControlUnstyled/FormControlUnstyled.js
  - /node_modules/@mui/base/InputUnstyled/InputUnstyled.js
  - /node_modules/@mui/base/MenuUnstyled/MenuUnstyled.js
  - /node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.js
  - /node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.js
  - /node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.js
  - /node_modules/@mui/base/OptionUnstyled/OptionUnstyled.js
  - /node_modules/@mui/base/SelectUnstyled/SelectUnstyled.js
  - /node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.js
  - /node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.js
  - /node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.js
  - /node_modules/@mui/base/TabsUnstyled/TabsUnstyled.js
  - /node_modules/@mui/base/TabUnstyled/TabUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/TabsUnstyled/TabsContext.js
bundle space:    0.02 %
rendered size:   642 Bytes
original size:   698 Bytes
code reduction:  8.02 %
dependents:      1
  - /node_modules/@mui/base/TabsUnstyled/TabsUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/createSvgIcon.js
bundle space:    0.02 %
rendered size:   635 Bytes
original size:   814 Bytes
code reduction:  21.99 %
dependents:      25
  - /node_modules/@mui/material/internal/svg-icons/SuccessOutlined.js
  - /node_modules/@mui/material/internal/svg-icons/ReportProblemOutlined.js
  - /node_modules/@mui/material/internal/svg-icons/ErrorOutline.js
  - /node_modules/@mui/material/internal/svg-icons/InfoOutlined.js
  - /node_modules/@mui/material/internal/svg-icons/Close.js
  - /node_modules/@mui/material/internal/svg-icons/ArrowDropDown.js
  - /node_modules/@mui/material/internal/svg-icons/Person.js
  - /node_modules/@mui/material/internal/svg-icons/CheckBoxOutlineBlank.js
  - /node_modules/@mui/material/internal/svg-icons/CheckBox.js
  - /node_modules/@mui/material/internal/svg-icons/IndeterminateCheckBox.js
  - /node_modules/@mui/material/internal/svg-icons/Cancel.js
  - /node_modules/@mui/material/internal/svg-icons/FirstPage.js
  - /node_modules/@mui/material/internal/svg-icons/LastPage.js
  - /node_modules/@mui/material/internal/svg-icons/NavigateBefore.js
  - /node_modules/@mui/material/internal/svg-icons/NavigateNext.js
  - /node_modules/@mui/material/internal/svg-icons/Star.js
  - /node_modules/@mui/material/internal/svg-icons/StarBorder.js
  - /node_modules/@mui/material/internal/svg-icons/CheckCircle.js
  - /node_modules/@mui/material/internal/svg-icons/Warning.js
  - /node_modules/@mui/material/internal/svg-icons/ArrowDownward.js
  - /node_modules/@mui/material/internal/svg-icons/KeyboardArrowLeft.js
  - /node_modules/@mui/material/internal/svg-icons/KeyboardArrowRight.js
  - /node_modules/@mui/material/internal/svg-icons/MoreHoriz.js
  - /node_modules/@mui/material/internal/svg-icons/RadioButtonUnchecked.js
  - /node_modules/@mui/material/internal/svg-icons/RadioButtonChecked.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/validation/rules/KnownFragmentNamesRule.mjs
bundle space:    0.02 %
rendered size:   631 Bytes
original size:   688 Bytes
code reduction:  8.28 %
dependents:      1
  - /node_modules/graphql/validation/specifiedRules.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/public/CheckoutOverlay/CheckoutOverlay.constants.ts
bundle space:    0.02 %
rendered size:   627 Bytes
original size:   669 Bytes
code reduction:  6.28 %
dependents:      2
  - /src/hooks/usePlaid.ts
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.utils.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/http/checkFetcher.js
bundle space:    0.02 %
rendered size:   627 Bytes
original size:   722 Bytes
code reduction:  13.16 %
dependents:      1
  - /node_modules/@apollo/client/link/http/createHttpLink.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
bundle space:    0.02 %
rendered size:   627 Bytes
original size:   759 Bytes
code reduction:  17.39 %
dependents:      4
  - /node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
  - /node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
  - /node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
  - /node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/compose.js
bundle space:    0.02 %
rendered size:   626 Bytes
original size:   670 Bytes
code reduction:  6.57 %
dependents:      8
  - /node_modules/@mui/system/esm/borders.js
  - /node_modules/@mui/system/esm/display.js
  - /node_modules/@mui/system/esm/flexbox.js
  - /node_modules/@mui/system/esm/grid.js
  - /node_modules/@mui/system/esm/palette.js
  - /node_modules/@mui/system/esm/positions.js
  - /node_modules/@mui/system/esm/sizing.js
  - /node_modules/@mui/system/esm/typography.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/setRef.js
bundle space:    0.02 %
rendered size:   625 Bytes
original size:   640 Bytes
code reduction:  2.34 %
dependents:      1
  - /node_modules/@mui/utils/esm/useForkRef.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/contains.js
bundle space:    0.02 %
rendered size:   625 Bytes
original size:   677 Bytes
code reduction:  7.68 %
dependents:      2
  - /node_modules/@popperjs/core/lib/modifiers/arrow.js
  - /node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
bundle space:    0.02 %
rendered size:   621 Bytes
original size:   767 Bytes
code reduction:  19.04 %
dependents:      3
  - /node_modules/@popperjs/core/lib/createPopper.js
  - /node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
  - /node_modules/@popperjs/core/lib/modifiers/arrow.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/utils/extractEventHandlers.js
bundle space:    0.02 %
rendered size:   620 Bytes
original size:   635 Bytes
code reduction:  2.36 %
dependents:      3
  - /node_modules/@mui/base/ButtonUnstyled/useButton.js
  - /node_modules/@mui/base/InputUnstyled/useInput.js
  - /node_modules/@mui/base/TabsListUnstyled/useTabsList.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/language/location.mjs
bundle space:    0.02 %
rendered size:   612 Bytes
original size:   664 Bytes
code reduction:  7.83 %
dependents:      2
  - /node_modules/graphql/language/printLocation.mjs
  - /node_modules/graphql/error/GraphQLError.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/jsutils/keyValMap.mjs
bundle space:    0.02 %
rendered size:   606 Bytes
original size:   614 Bytes
code reduction:  1.3 %
dependents:      2
  - /node_modules/graphql/type/definition.mjs
  - /node_modules/graphql/utilities/valueFromASTUntyped.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/ListboxUnstyled/useListbox.types.js
bundle space:    0.02 %
rendered size:   598 Bytes
original size:   594 Bytes
code reduction:  0 %
dependents:      3
  - /node_modules/@mui/base/ListboxUnstyled/useListbox.js
  - /node_modules/@mui/base/ListboxUnstyled/defaultListboxReducer.js
  - /node_modules/@mui/base/ListboxUnstyled/useControllableReducer.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/utils/appendOwnerState.js
bundle space:    0.02 %
rendered size:   591 Bytes
original size:   681 Bytes
code reduction:  13.22 %
dependents:      9
  - /node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.js
  - /node_modules/@mui/base/SliderUnstyled/SliderUnstyled.js
  - /node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.js
  - /node_modules/@mui/base/FormControlUnstyled/FormControlUnstyled.js
  - /node_modules/@mui/base/InputUnstyled/InputUnstyled.js
  - /node_modules/@mui/base/MenuUnstyled/MenuUnstyled.js
  - /node_modules/@mui/base/OptionUnstyled/OptionUnstyled.js
  - /node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.js
  - /node_modules/@mui/base/TabUnstyled/TabUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/display.js
bundle space:    0.02 %
rendered size:   588 Bytes
original size:   616 Bytes
code reduction:  4.55 %
dependents:      1
  - /node_modules/@mui/system/esm/getThemeValue.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/public/SuccessOverlay/StaticSuccessOverlay.tsx
bundle space:    0.02 %
rendered size:   586 Bytes
original size:   904 Bytes
code reduction:  35.18 %
dependents:      2
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/components/public/SuccessOverlay/SuccessOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/transitions/utils.js
bundle space:    0.02 %
rendered size:   581 Bytes
original size:   595 Bytes
code reduction:  2.35 %
dependents:      6
  - /node_modules/@mui/material/Collapse/Collapse.js
  - /node_modules/@mui/material/Fade/Fade.js
  - /node_modules/@mui/material/Grow/Grow.js
  - /node_modules/@mui/material/Slide/Slide.js
  - /node_modules/@mui/material/SwipeableDrawer/SwipeableDrawer.js
  - /node_modules/@mui/material/Zoom/Zoom.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/public/ErrorOverlay/StaticErrorOverlay.tsx
bundle space:    0.02 %
rendered size:   571 Bytes
original size:   877 Bytes
code reduction:  34.89 %
dependents:      2
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/components/public/ErrorOverlay/ErrorOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/composeClasses/composeClasses.js
bundle space:    0.02 %
rendered size:   568 Bytes
original size:   583 Bytes
code reduction:  2.57 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
bundle space:    0.02 %
rendered size:   565 Bytes
original size:   721 Bytes
code reduction:  21.64 %
dependents:      3
  - /node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
  - /node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
  - /node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
bundle space:    0.02 %
rendered size:   561 Bytes
original size:   621 Bytes
code reduction:  9.66 %
dependents:      13
  - /node_modules/@popperjs/core/lib/createPopper.js
  - /node_modules/@popperjs/core/lib/modifiers/applyStyles.js
  - /node_modules/@popperjs/core/lib/modifiers/arrow.js
  - /node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
  - /node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
  - /node_modules/@popperjs/core/lib/utils/detectOverflow.js
  - /node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
  - /node_modules/@popperjs/core/lib/dom-utils/contains.js
  - /node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
  - /node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
  - /node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
  - /node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
  - /node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Paper/paperClasses.js
bundle space:    0.02 %
rendered size:   557 Bytes
original size:   666 Bytes
code reduction:  16.37 %
dependents:      1
  - /node_modules/@mui/material/Paper/Paper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/utils/transformOperation.js
bundle space:    0.02 %
rendered size:   555 Bytes
original size:   659 Bytes
code reduction:  15.78 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/use-callback-ref/dist/es2015/assignRef.js
bundle space:    0.02 %
rendered size:   548 Bytes
original size:   556 Bytes
code reduction:  1.44 %
dependents:      1
  - /node_modules/use-callback-ref/dist/es2015/useMergeRef.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Autocomplete/autocompleteClasses.js
bundle space:    0.02 %
rendered size:   541 Bytes
original size:   636 Bytes
code reduction:  14.94 %
dependents:      1
  - /node_modules/@mui/material/Autocomplete/Autocomplete.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/react/context/ApolloContext.js
bundle space:    0.02 %
rendered size:   535 Bytes
original size:   684 Bytes
code reduction:  21.78 %
dependents:      1
  - /node_modules/@apollo/client/react/context/ApolloProvider.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/common/canUse.js
bundle space:    0.02 %
rendered size:   533 Bytes
original size:   630 Bytes
code reduction:  15.4 %
dependents:      1
  - /node_modules/@apollo/client/utilities/observables/subclassing.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js
bundle space:    0.02 %
rendered size:   525 Bytes
original size:   585 Bytes
code reduction:  10.26 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/Checkbox/CheckboxIconUnchecked/CheckboxIconUnchecked.tsx
bundle space:    0.02 %
rendered size:   519 Bytes
original size:   644 Bytes
code reduction:  19.41 %
dependents:      1
  - /src/components/shared/Checkbox/Checkbox.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/CheckoutModalFooter/CheckoutModalFooter.constants.ts
bundle space:    0.02 %
rendered size:   517 Bytes
original size:   761 Bytes
code reduction:  32.06 %
dependents:      1
  - /src/components/payments/CheckoutModalFooter/CheckoutModalFooter.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/useForkRef.js
bundle space:    0.02 %
rendered size:   512 Bytes
original size:   557 Bytes
code reduction:  8.08 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/capitalize.js
bundle space:    0.02 %
rendered size:   510 Bytes
original size:   577 Bytes
code reduction:  11.61 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/mergeByName.js
bundle space:    0.02 %
rendered size:   509 Bytes
original size:   524 Bytes
code reduction:  2.86 %
dependents:      1
  - /node_modules/@popperjs/core/lib/createPopper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/styles/CssVarsProvider.js
bundle space:    0.02 %
rendered size:   506 Bytes
original size:   974 Bytes
code reduction:  48.05 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/TabPanelUnstyled/useTabPanel.js
bundle space:    0.02 %
rendered size:   499 Bytes
original size:   564 Bytes
code reduction:  11.52 %
dependents:      1
  - /node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/utils/validateOperation.js
bundle space:    0.01 %
rendered size:   495 Bytes
original size:   595 Bytes
code reduction:  16.81 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/utilities/typeFromAST.mjs
bundle space:    0.01 %
rendered size:   492 Bytes
original size:   576 Bytes
code reduction:  14.58 %
dependents:      7
  - /node_modules/graphql/execution/values.mjs
  - /node_modules/graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs
  - /node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs
  - /node_modules/graphql/validation/rules/PossibleFragmentSpreadsRule.mjs
  - /node_modules/graphql/validation/rules/VariablesAreInputTypesRule.mjs
  - /node_modules/graphql/validation/rules/VariablesInAllowedPositionRule.mjs
  - /node_modules/graphql/execution/collectFields.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/SecondaryButton/SecondaryButton.tsx
bundle space:    0.01 %
rendered size:   488 Bytes
original size:   732 Bytes
code reduction:  33.33 %
dependents:      5
  - /src/forms/BillingInfoForm.tsx
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/shared/SavedBillingDetailsSelector/SavedBillingDetailsSelector.tsx
  - /src/components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.tsx
  - /src/components/payments/SavedItem/SavedItem.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/PrimaryButton/PrimaryButton.tsx
bundle space:    0.01 %
rendered size:   485 Bytes
original size:   725 Bytes
code reduction:  33.1 %
dependents:      2
  - /src/components/payments/CheckoutModalHeader/CheckoutModalHeader.tsx
  - /src/components/payments/CheckoutModalFooter/CheckoutModalFooter.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/HTMLElementType.js
bundle space:    0.01 %
rendered size:   485 Bytes
original size:   500 Bytes
code reduction:  3 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/public/PlaidOverlay/PlaidOverlay.ts
bundle space:    0.01 %
rendered size:   483 Bytes
original size:   897 Bytes
code reduction:  46.15 %
dependents:      1
  - /src/index.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/dom-helpers/esm/addClass.js
bundle space:    0.01 %
rendered size:   481 Bytes
original size:   520 Bytes
code reduction:  7.5 %
dependents:      1
  - /node_modules/react-transition-group/esm/CSSTransition.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/styled-engine/StyledEngineProvider/StyledEngineProvider.js
bundle space:    0.01 %
rendered size:   478 Bytes
original size:   1.088 KB
code reduction:  56.07 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/globals/DEV.js
bundle space:    0.01 %
rendered size:   474 Bytes
original size:   553 Bytes
code reduction:  14.29 %
dependents:      1
  - /node_modules/@apollo/client/utilities/globals/index.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/DisplayBox/DisplayBox.tsx
bundle space:    0.01 %
rendered size:   467 Bytes
original size:   565 Bytes
code reduction:  17.35 %
dependents:      5
  - /src/forms/BillingInfoForm.tsx
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.tsx
  - /src/components/payments/DeliveryWallet/DeliveryWalletSelector/DeliveryWalletSelector.tsx
  - /src/components/payments/SavedItem/SavedItem.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/InputBase/inputBaseClasses.js
bundle space:    0.01 %
rendered size:   466 Bytes
original size:   558 Bytes
code reduction:  16.49 %
dependents:      2
  - /node_modules/@mui/material/Autocomplete/Autocomplete.js
  - /node_modules/@mui/material/InputBase/InputBase.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/common/compact.js
bundle space:    0.01 %
rendered size:   462 Bytes
original size:   505 Bytes
code reduction:  8.51 %
dependents:      1
  - /node_modules/@apollo/client/utilities/common/mergeOptions.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/LinearProgress/linearProgressClasses.js
bundle space:    0.01 %
rendered size:   460 Bytes
original size:   587 Bytes
code reduction:  21.64 %
dependents:      1
  - /node_modules/@mui/material/LinearProgress/LinearProgress.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ImageListItemBar/imageListItemBarClasses.js
bundle space:    0.01 %
rendered size:   448 Bytes
original size:   579 Bytes
code reduction:  22.63 %
dependents:      1
  - /node_modules/@mui/material/ImageListItemBar/ImageListItemBar.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/utils/arrayUtils.ts
bundle space:    0.01 %
rendered size:   445 Bytes
original size:   535 Bytes
code reduction:  16.82 %
dependents:      2
  - /src/views/Billing/BillingView.tsx
  - /src/hooks/useLimits.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Alert/alertClasses.js
bundle space:    0.01 %
rendered size:   445 Bytes
original size:   533 Bytes
code reduction:  16.51 %
dependents:      1
  - /node_modules/@mui/material/Alert/Alert.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/react/hooks/useApolloClient.js
bundle space:    0.01 %
rendered size:   445 Bytes
original size:   610 Bytes
code reduction:  27.05 %
dependents:      3
  - /node_modules/@apollo/client/react/hooks/useLazyQuery.js
  - /node_modules/@apollo/client/react/hooks/useMutation.js
  - /node_modules/@apollo/client/react/hooks/useQuery.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/SliderUnstyled/sliderUnstyledClasses.js
bundle space:    0.01 %
rendered size:   443 Bytes
original size:   590 Bytes
code reduction:  24.92 %
dependents:      2
  - /node_modules/@mui/base/SliderUnstyled/SliderUnstyled.js
  - /node_modules/@mui/base/SliderUnstyled/SliderValueLabelUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/PaginationItem/paginationItemClasses.js
bundle space:    0.01 %
rendered size:   439 Bytes
original size:   536 Bytes
code reduction:  18.1 %
dependents:      1
  - /node_modules/@mui/material/PaginationItem/PaginationItem.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/resolveProps.js
bundle space:    0.01 %
rendered size:   436 Bytes
original size:   500 Bytes
code reduction:  12.8 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/providers/DictionaryProvider.tsx
bundle space:    0.01 %
rendered size:   432 Bytes
original size:   754 Bytes
code reduction:  42.71 %
dependents:      2
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/hooks/useDictionary.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/debounce.js
bundle space:    0.01 %
rendered size:   424 Bytes
original size:   439 Bytes
code reduction:  3.42 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-payment-inputs/es/utils/index.js
bundle space:    0.01 %
rendered size:   423 Bytes
original size:   685 Bytes
code reduction:  38.25 %
dependents:      1
  - /node_modules/react-payment-inputs/es/usePaymentInputs.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/positions.js
bundle space:    0.01 %
rendered size:   423 Bytes
original size:   449 Bytes
code reduction:  5.79 %
dependents:      1
  - /node_modules/@mui/system/esm/getThemeValue.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/http/serializeFetchParameter.js
bundle space:    0.01 %
rendered size:   422 Bytes
original size:   528 Bytes
code reduction:  20.08 %
dependents:      2
  - /node_modules/@apollo/client/link/http/createHttpLink.js
  - /node_modules/@apollo/client/link/http/rewriteURIForGET.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/utils/reactUtils.ts
bundle space:    0.01 %
rendered size:   413 Bytes
original size:   209 Bytes
code reduction:  0 %
dependents:      2
  - /src/components/shared/PrimaryButton/PrimaryButton.tsx
  - /src/components/shared/SecondaryButton/SecondaryButton.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/InputGroupLabel/InputGroupLabel.tsx
bundle space:    0.01 %
rendered size:   412 Bytes
original size:   573 Bytes
code reduction:  28.1 %
dependents:      5
  - /src/forms/BillingInfoForm.tsx
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/shared/SavedBillingDetailsSelector/SavedBillingDetailsSelector.tsx
  - /src/components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.tsx
  - /src/components/payments/DeliveryWallet/DeliveryWalletSelector/DeliveryWalletSelector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Rating/ratingClasses.js
bundle space:    0.01 %
rendered size:   411 Bytes
original size:   500 Bytes
code reduction:  17.8 %
dependents:      1
  - /node_modules/@mui/material/Rating/Rating.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/getScrollbarSize.js
bundle space:    0.01 %
rendered size:   411 Bytes
original size:   426 Bytes
code reduction:  3.52 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Dialog/dialogClasses.js
bundle space:    0.01 %
rendered size:   407 Bytes
original size:   496 Bytes
code reduction:  17.94 %
dependents:      1
  - /node_modules/@mui/material/Dialog/Dialog.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@babel/runtime/helpers/esm/extends.js
bundle space:    0.01 %
rendered size:   403 Bytes
original size:   418 Bytes
code reduction:  3.59 %
dependents:      197
  - /node_modules/@mui/material/styles/createTheme.js
  - /node_modules/@mui/material/styles/createTransitions.js
  - /node_modules/@mui/material/styles/CssVarsProvider.js
  - /node_modules/@mui/material/styles/experimental_extendTheme.js
  - /node_modules/@mui/material/utils/createSvgIcon.js
  - /node_modules/@mui/material/Accordion/Accordion.js
  - /node_modules/@mui/material/AccordionActions/AccordionActions.js
  - /node_modules/@mui/material/AccordionDetails/AccordionDetails.js
  - /node_modules/@mui/material/AccordionSummary/AccordionSummary.js
  - /node_modules/@mui/material/Alert/Alert.js
  - /node_modules/@mui/material/AlertTitle/AlertTitle.js
  - /node_modules/@mui/material/AppBar/AppBar.js
  - /node_modules/@mui/material/Autocomplete/Autocomplete.js
  - /node_modules/@mui/material/Avatar/Avatar.js
  - /node_modules/@mui/material/AvatarGroup/AvatarGroup.js
  - /node_modules/@mui/material/Backdrop/Backdrop.js
  - /node_modules/@mui/material/Badge/Badge.js
  - /node_modules/@mui/material/BottomNavigation/BottomNavigation.js
  - /node_modules/@mui/material/BottomNavigationAction/BottomNavigationAction.js
  - /node_modules/@mui/material/Breadcrumbs/Breadcrumbs.js
  - /node_modules/@mui/material/Button/Button.js
  - /node_modules/@mui/material/ButtonBase/ButtonBase.js
  - /node_modules/@mui/material/ButtonGroup/ButtonGroup.js
  - /node_modules/@mui/material/Card/Card.js
  - /node_modules/@mui/material/CardActionArea/CardActionArea.js
  - /node_modules/@mui/material/CardActions/CardActions.js
  - /node_modules/@mui/material/CardContent/CardContent.js
  - /node_modules/@mui/material/CardHeader/CardHeader.js
  - /node_modules/@mui/material/CardMedia/CardMedia.js
  - /node_modules/@mui/material/Checkbox/Checkbox.js
  - /node_modules/@mui/material/Chip/Chip.js
  - /node_modules/@mui/material/CircularProgress/CircularProgress.js
  - /node_modules/@mui/material/Collapse/Collapse.js
  - /node_modules/@mui/material/CssBaseline/CssBaseline.js
  - /node_modules/@mui/material/Dialog/Dialog.js
  - /node_modules/@mui/material/DialogActions/DialogActions.js
  - /node_modules/@mui/material/DialogContent/DialogContent.js
  - /node_modules/@mui/material/DialogContentText/DialogContentText.js
  - /node_modules/@mui/material/DialogTitle/DialogTitle.js
  - /node_modules/@mui/material/Divider/Divider.js
  - /node_modules/@mui/material/Drawer/Drawer.js
  - /node_modules/@mui/material/Fab/Fab.js
  - /node_modules/@mui/material/Fade/Fade.js
  - /node_modules/@mui/material/FilledInput/FilledInput.js
  - /node_modules/@mui/material/FilledInput/filledInputClasses.js
  - /node_modules/@mui/material/FormControl/FormControl.js
  - /node_modules/@mui/material/FormControlLabel/FormControlLabel.js
  - /node_modules/@mui/material/FormGroup/FormGroup.js
  - /node_modules/@mui/material/FormHelperText/FormHelperText.js
  - /node_modules/@mui/material/FormLabel/FormLabel.js
  - /node_modules/@mui/material/Grid/Grid.js
  - /node_modules/@mui/material/Grow/Grow.js
  - /node_modules/@mui/material/Hidden/Hidden.js
  - /node_modules/@mui/material/Icon/Icon.js
  - /node_modules/@mui/material/IconButton/IconButton.js
  - /node_modules/@mui/material/ImageList/ImageList.js
  - /node_modules/@mui/material/ImageListItem/ImageListItem.js
  - /node_modules/@mui/material/ImageListItemBar/ImageListItemBar.js
  - /node_modules/@mui/material/Input/Input.js
  - /node_modules/@mui/material/Input/inputClasses.js
  - /node_modules/@mui/material/InputAdornment/InputAdornment.js
  - /node_modules/@mui/material/InputBase/InputBase.js
  - /node_modules/@mui/material/InputLabel/InputLabel.js
  - /node_modules/@mui/material/LinearProgress/LinearProgress.js
  - /node_modules/@mui/material/Link/Link.js
  - /node_modules/@mui/material/List/List.js
  - /node_modules/@mui/material/ListItem/ListItem.js
  - /node_modules/@mui/material/ListItemAvatar/ListItemAvatar.js
  - /node_modules/@mui/material/ListItemButton/ListItemButton.js
  - /node_modules/@mui/material/ListItemIcon/ListItemIcon.js
  - /node_modules/@mui/material/ListItemSecondaryAction/ListItemSecondaryAction.js
  - /node_modules/@mui/material/ListItemText/ListItemText.js
  - /node_modules/@mui/material/ListSubheader/ListSubheader.js
  - /node_modules/@mui/material/Menu/Menu.js
  - /node_modules/@mui/material/MenuItem/MenuItem.js
  - /node_modules/@mui/material/MenuList/MenuList.js
  - /node_modules/@mui/material/MobileStepper/MobileStepper.js
  - /node_modules/@mui/material/Modal/Modal.js
  - /node_modules/@mui/material/NativeSelect/NativeSelect.js
  - /node_modules/@mui/material/OutlinedInput/OutlinedInput.js
  - /node_modules/@mui/material/OutlinedInput/outlinedInputClasses.js
  - /node_modules/@mui/material/Pagination/Pagination.js
  - /node_modules/@mui/material/PaginationItem/PaginationItem.js
  - /node_modules/@mui/material/Paper/Paper.js
  - /node_modules/@mui/material/Popover/Popover.js
  - /node_modules/@mui/material/Popper/Popper.js
  - /node_modules/@mui/material/Radio/Radio.js
  - /node_modules/@mui/material/RadioGroup/RadioGroup.js
  - /node_modules/@mui/material/Rating/Rating.js
  - /node_modules/@mui/material/ScopedCssBaseline/ScopedCssBaseline.js
  - /node_modules/@mui/material/Select/Select.js
  - /node_modules/@mui/material/Skeleton/Skeleton.js
  - /node_modules/@mui/material/Slide/Slide.js
  - /node_modules/@mui/material/Slider/Slider.js
  - /node_modules/@mui/material/Snackbar/Snackbar.js
  - /node_modules/@mui/material/SnackbarContent/SnackbarContent.js
  - /node_modules/@mui/material/SpeedDial/SpeedDial.js
  - /node_modules/@mui/material/SpeedDialAction/SpeedDialAction.js
  - /node_modules/@mui/material/SpeedDialIcon/SpeedDialIcon.js
  - /node_modules/@mui/material/Stack/Stack.js
  - /node_modules/@mui/material/Step/Step.js
  - /node_modules/@mui/material/StepButton/StepButton.js
  - /node_modules/@mui/material/StepConnector/StepConnector.js
  - /node_modules/@mui/material/StepContent/StepContent.js
  - /node_modules/@mui/material/StepIcon/StepIcon.js
  - /node_modules/@mui/material/StepLabel/StepLabel.js
  - /node_modules/@mui/material/Stepper/Stepper.js
  - /node_modules/@mui/material/SvgIcon/SvgIcon.js
  - /node_modules/@mui/material/SwipeableDrawer/SwipeableDrawer.js
  - /node_modules/@mui/material/Switch/Switch.js
  - /node_modules/@mui/material/Tab/Tab.js
  - /node_modules/@mui/material/Table/Table.js
  - /node_modules/@mui/material/TableBody/TableBody.js
  - /node_modules/@mui/material/TableCell/TableCell.js
  - /node_modules/@mui/material/TableContainer/TableContainer.js
  - /node_modules/@mui/material/TableFooter/TableFooter.js
  - /node_modules/@mui/material/TableHead/TableHead.js
  - /node_modules/@mui/material/TablePagination/TablePagination.js
  - /node_modules/@mui/material/TableRow/TableRow.js
  - /node_modules/@mui/material/TableSortLabel/TableSortLabel.js
  - /node_modules/@mui/material/Tabs/Tabs.js
  - /node_modules/@mui/material/TabScrollButton/TabScrollButton.js
  - /node_modules/@mui/material/TextField/TextField.js
  - /node_modules/@mui/material/ToggleButton/ToggleButton.js
  - /node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js
  - /node_modules/@mui/material/Toolbar/Toolbar.js
  - /node_modules/@mui/material/Tooltip/Tooltip.js
  - /node_modules/@mui/material/Typography/Typography.js
  - /node_modules/@mui/material/usePagination/usePagination.js
  - /node_modules/@mui/material/Zoom/Zoom.js
  - /node_modules/@mui/material/GlobalStyles/GlobalStyles.js
  - /node_modules/@mui/material/styles/createMixins.js
  - /node_modules/@mui/material/styles/createPalette.js
  - /node_modules/@mui/material/styles/createTypography.js
  - /node_modules/@mui/material/Breadcrumbs/BreadcrumbCollapsed.js
  - /node_modules/@mui/material/ButtonBase/TouchRipple.js
  - /node_modules/@mui/material/internal/SwitchBase.js
  - /node_modules/@mui/material/Hidden/HiddenCss.js
  - /node_modules/@mui/material/NativeSelect/NativeSelectInput.js
  - /node_modules/@mui/material/OutlinedInput/NotchedOutline.js
  - /node_modules/@mui/material/Radio/RadioButtonIcon.js
  - /node_modules/@mui/material/Select/SelectInput.js
  - /node_modules/@mui/material/SwipeableDrawer/SwipeArea.js
  - /node_modules/@mui/material/TablePagination/TablePaginationActions.js
  - /node_modules/@mui/material/Tabs/ScrollbarSize.js
  - /node_modules/@mui/base/ModalUnstyled/ModalUnstyled.js
  - /node_modules/@mui/system/esm/breakpoints.js
  - /node_modules/@mui/system/esm/createBox.js
  - /node_modules/@mui/system/esm/createStyled.js
  - /node_modules/@mui/system/esm/createTheme/createBreakpoints.js
  - /node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js
  - /node_modules/@mui/system/esm/Container/createContainer.js
  - /node_modules/@mui/base/TextareaAutosize/TextareaAutosize.js
  - /node_modules/@mui/material/Hidden/withWidth.js
  - /node_modules/@mui/utils/esm/deepmerge.js
  - /node_modules/@mui/utils/esm/exactProp.js
  - /node_modules/@mui/utils/esm/requirePropFactory.js
  - /node_modules/@mui/utils/esm/resolveProps.js
  - /node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.js
  - /node_modules/react-transition-group/esm/CSSTransition.js
  - /node_modules/react-transition-group/esm/TransitionGroup.js
  - /node_modules/@mui/base/PopperUnstyled/PopperUnstyled.js
  - /node_modules/@mui/base/SliderUnstyled/SliderUnstyled.js
  - /node_modules/@mui/base/SliderUnstyled/useSlider.js
  - /node_modules/@mui/system/esm/cssVars/useCurrentColorScheme.js
  - /node_modules/@mui/base/utils/appendOwnerState.js
  - /node_modules/@mui/base/AutocompleteUnstyled/useAutocomplete.js
  - /node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.js
  - /node_modules/@mui/base/ButtonUnstyled/useButton.js
  - /node_modules/@mui/base/FormControlUnstyled/FormControlUnstyled.js
  - /node_modules/@mui/base/InputUnstyled/InputUnstyled.js
  - /node_modules/@mui/base/InputUnstyled/useInput.js
  - /node_modules/@mui/system/esm/createTheme/createTheme.js
  - /node_modules/@mui/base/ListboxUnstyled/useListbox.js
  - /node_modules/@mui/base/ListboxUnstyled/defaultListboxReducer.js
  - /node_modules/@mui/base/MenuUnstyled/MenuUnstyled.js
  - /node_modules/@mui/base/MenuUnstyled/useMenu.js
  - /node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js
  - /node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.js
  - /node_modules/@mui/base/MenuItemUnstyled/useMenuItem.js
  - /node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.js
  - /node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.js
  - /node_modules/@mui/base/OptionUnstyled/OptionUnstyled.js
  - /node_modules/@mui/base/SelectUnstyled/SelectUnstyled.js
  - /node_modules/@mui/base/SelectUnstyled/useSelect.js
  - /node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.js
  - /node_modules/@mui/base/SwitchUnstyled/useSwitch.js
  - /node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.js
  - /node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.js
  - /node_modules/@mui/base/TabsListUnstyled/useTabsList.js
  - /node_modules/@mui/base/TabsUnstyled/TabsUnstyled.js
  - /node_modules/@mui/base/TabUnstyled/TabUnstyled.js
  - /node_modules/@mui/base/TabUnstyled/useTab.js
  - /node_modules/@emotion/react/dist/emotion-react.esm.js
  - /node_modules/@mui/base/SelectUnstyled/utils.js
  - /node_modules/@emotion/react/dist/emotion-element-570fe3bb.esm.js
  - /node_modules/@mui/private-theming/ThemeProvider/ThemeProvider.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js
bundle space:    0.01 %
rendered size:   403 Bytes
original size:   438 Bytes
code reduction:  7.99 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/createChainedFunction.js
bundle space:    0.01 %
rendered size:   400 Bytes
original size:   415 Bytes
code reduction:  3.61 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Typography/typographyClasses.js
bundle space:    0.01 %
rendered size:   392 Bytes
original size:   511 Bytes
code reduction:  23.29 %
dependents:      1
  - /node_modules/@mui/material/Typography/Typography.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/useEventCallback.js
bundle space:    0.01 %
rendered size:   391 Bytes
original size:   458 Bytes
code reduction:  14.63 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/styles/cssUtils.js
bundle space:    0.01 %
rendered size:   389 Bytes
original size:   3.624 KB
code reduction:  89.27 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/popper.js
bundle space:    0.01 %
rendered size:   385 Bytes
original size:   1.09 KB
code reduction:  64.68 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
bundle space:    0.01 %
rendered size:   384 Bytes
original size:   546 Bytes
code reduction:  29.67 %
dependents:      1
  - /node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
bundle space:    0.01 %
rendered size:   382 Bytes
original size:   440 Bytes
code reduction:  13.18 %
dependents:      3
  - /node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
  - /node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
  - /node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Tooltip/tooltipClasses.js
bundle space:    0.01 %
rendered size:   381 Bytes
original size:   471 Bytes
code reduction:  19.11 %
dependents:      1
  - /node_modules/@mui/material/Tooltip/Tooltip.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/Number/Number.tsx
bundle space:    0.01 %
rendered size:   373 Bytes
original size:   513 Bytes
code reduction:  27.29 %
dependents:      2
  - /src/components/payments/CheckoutItemCost/List/CheckoutItemList.tsx
  - /src/components/payments/CheckoutItemCost/Total/CheckoutItemCostTotal.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/unsupportedProp.js
bundle space:    0.01 %
rendered size:   369 Bytes
original size:   384 Bytes
code reduction:  3.91 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Divider/dividerClasses.js
bundle space:    0.01 %
rendered size:   367 Bytes
original size:   457 Bytes
code reduction:  19.69 %
dependents:      1
  - /node_modules/@mui/material/Divider/Divider.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Drawer/drawerClasses.js
bundle space:    0.01 %
rendered size:   367 Bytes
original size:   478 Bytes
code reduction:  23.22 %
dependents:      1
  - /node_modules/@mui/material/Drawer/Drawer.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/jsutils/groupBy.mjs
bundle space:    0.01 %
rendered size:   367 Bytes
original size:   375 Bytes
code reduction:  2.13 %
dependents:      3
  - /node_modules/graphql/validation/rules/UniqueArgumentNamesRule.mjs
  - /node_modules/graphql/validation/rules/UniqueVariableNamesRule.mjs
  - /node_modules/graphql/validation/rules/UniqueArgumentDefinitionNamesRule.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/http/HttpLink.js
bundle space:    0.01 %
rendered size:   365 Bytes
original size:   523 Bytes
code reduction:  30.21 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/dom-helpers/esm/hasClass.js
bundle space:    0.01 %
rendered size:   365 Bytes
original size:   380 Bytes
code reduction:  3.95 %
dependents:      1
  - /node_modules/dom-helpers/esm/addClass.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Tabs/tabsClasses.js
bundle space:    0.01 %
rendered size:   364 Bytes
original size:   451 Bytes
code reduction:  19.29 %
dependents:      1
  - /node_modules/@mui/material/Tabs/Tabs.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/util/sortByKeyOrder.js
bundle space:    0.01 %
rendered size:   359 Bytes
original size:   374 Bytes
code reduction:  4.01 %
dependents:      1
  - /node_modules/yup/es/object.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/NativeSelect/nativeSelectClasses.js
bundle space:    0.01 %
rendered size:   356 Bytes
original size:   451 Bytes
code reduction:  21.06 %
dependents:      2
  - /node_modules/@mui/material/NativeSelect/NativeSelect.js
  - /node_modules/@mui/material/NativeSelect/NativeSelectInput.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TableCell/tableCellClasses.js
bundle space:    0.01 %
rendered size:   354 Bytes
original size:   446 Bytes
code reduction:  20.63 %
dependents:      1
  - /node_modules/@mui/material/TableCell/TableCell.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/SuccessOutlined.js
bundle space:    0.01 %
rendered size:   354 Bytes
original size:   500 Bytes
code reduction:  29.2 %
dependents:      1
  - /node_modules/@mui/material/Alert/Alert.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/palette.js
bundle space:    0.01 %
rendered size:   354 Bytes
original size:   417 Bytes
code reduction:  15.11 %
dependents:      1
  - /node_modules/@mui/system/esm/getThemeValue.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@emotion/weak-memoize/dist/weak-memoize.esm.js
bundle space:    0.01 %
rendered size:   342 Bytes
original size:   372 Bytes
code reduction:  8.06 %
dependents:      3
  - /node_modules/@emotion/react/dist/emotion-react.esm.js
  - /node_modules/@emotion/react/dist/emotion-element-570fe3bb.esm.js
  - /node_modules/@emotion/cache/dist/emotion-cache.esm.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Fab/fabClasses.js
bundle space:    0.01 %
rendered size:   340 Bytes
original size:   426 Bytes
code reduction:  20.19 %
dependents:      1
  - /node_modules/@mui/material/Fab/Fab.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/SpeedDialAction/speedDialActionClasses.js
bundle space:    0.01 %
rendered size:   340 Bytes
original size:   438 Bytes
code reduction:  22.37 %
dependents:      1
  - /node_modules/@mui/material/SpeedDialAction/SpeedDialAction.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TablePagination/tablePaginationClasses.js
bundle space:    0.01 %
rendered size:   340 Bytes
original size:   438 Bytes
code reduction:  22.37 %
dependents:      1
  - /node_modules/@mui/material/TablePagination/TablePagination.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/CircularProgress/circularProgressClasses.js
bundle space:    0.01 %
rendered size:   339 Bytes
original size:   470 Bytes
code reduction:  27.87 %
dependents:      1
  - /node_modules/@mui/material/CircularProgress/CircularProgress.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/http/selectURI.js
bundle space:    0.01 %
rendered size:   339 Bytes
original size:   384 Bytes
code reduction:  11.72 %
dependents:      1
  - /node_modules/@apollo/client/link/http/createHttpLink.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/symbol-observable/es/index.js
bundle space:    0.01 %
rendered size:   339 Bytes
original size:   403 Bytes
code reduction:  15.88 %
dependents:      1
  - /node_modules/@apollo/client/utilities/observables/Observable.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/AppBar/appBarClasses.js
bundle space:    0.01 %
rendered size:   338 Bytes
original size:   449 Bytes
code reduction:  24.72 %
dependents:      1
  - /node_modules/@mui/material/AppBar/AppBar.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ListItem/listItemClasses.js
bundle space:    0.01 %
rendered size:   336 Bytes
original size:   427 Bytes
code reduction:  21.31 %
dependents:      1
  - /node_modules/@mui/material/ListItem/ListItem.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Select/selectClasses.js
bundle space:    0.01 %
rendered size:   335 Bytes
original size:   424 Bytes
code reduction:  20.99 %
dependents:      1
  - /node_modules/@mui/material/Select/SelectInput.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
bundle space:    0.01 %
rendered size:   335 Bytes
original size:   350 Bytes
code reduction:  4.29 %
dependents:      167
  - /node_modules/@mui/material/styles/createTheme.js
  - /node_modules/@mui/material/styles/createTransitions.js
  - /node_modules/@mui/material/styles/experimental_extendTheme.js
  - /node_modules/@mui/material/Accordion/Accordion.js
  - /node_modules/@mui/material/AccordionActions/AccordionActions.js
  - /node_modules/@mui/material/AccordionDetails/AccordionDetails.js
  - /node_modules/@mui/material/AccordionSummary/AccordionSummary.js
  - /node_modules/@mui/material/Alert/Alert.js
  - /node_modules/@mui/material/AlertTitle/AlertTitle.js
  - /node_modules/@mui/material/AppBar/AppBar.js
  - /node_modules/@mui/material/Autocomplete/Autocomplete.js
  - /node_modules/@mui/material/Avatar/Avatar.js
  - /node_modules/@mui/material/AvatarGroup/AvatarGroup.js
  - /node_modules/@mui/material/Backdrop/Backdrop.js
  - /node_modules/@mui/material/Badge/Badge.js
  - /node_modules/@mui/material/BottomNavigation/BottomNavigation.js
  - /node_modules/@mui/material/BottomNavigationAction/BottomNavigationAction.js
  - /node_modules/@mui/material/Breadcrumbs/Breadcrumbs.js
  - /node_modules/@mui/material/Button/Button.js
  - /node_modules/@mui/material/ButtonBase/ButtonBase.js
  - /node_modules/@mui/material/ButtonGroup/ButtonGroup.js
  - /node_modules/@mui/material/Card/Card.js
  - /node_modules/@mui/material/CardActionArea/CardActionArea.js
  - /node_modules/@mui/material/CardActions/CardActions.js
  - /node_modules/@mui/material/CardContent/CardContent.js
  - /node_modules/@mui/material/CardHeader/CardHeader.js
  - /node_modules/@mui/material/CardMedia/CardMedia.js
  - /node_modules/@mui/material/Checkbox/Checkbox.js
  - /node_modules/@mui/material/Chip/Chip.js
  - /node_modules/@mui/material/CircularProgress/CircularProgress.js
  - /node_modules/@mui/material/Collapse/Collapse.js
  - /node_modules/@mui/material/Dialog/Dialog.js
  - /node_modules/@mui/material/DialogActions/DialogActions.js
  - /node_modules/@mui/material/DialogContent/DialogContent.js
  - /node_modules/@mui/material/DialogContentText/DialogContentText.js
  - /node_modules/@mui/material/DialogTitle/DialogTitle.js
  - /node_modules/@mui/material/Divider/Divider.js
  - /node_modules/@mui/material/Drawer/Drawer.js
  - /node_modules/@mui/material/Fab/Fab.js
  - /node_modules/@mui/material/Fade/Fade.js
  - /node_modules/@mui/material/FilledInput/FilledInput.js
  - /node_modules/@mui/material/FormControl/FormControl.js
  - /node_modules/@mui/material/FormControlLabel/FormControlLabel.js
  - /node_modules/@mui/material/FormGroup/FormGroup.js
  - /node_modules/@mui/material/FormHelperText/FormHelperText.js
  - /node_modules/@mui/material/FormLabel/FormLabel.js
  - /node_modules/@mui/material/Grid/Grid.js
  - /node_modules/@mui/material/Grow/Grow.js
  - /node_modules/@mui/material/Hidden/Hidden.js
  - /node_modules/@mui/material/Icon/Icon.js
  - /node_modules/@mui/material/IconButton/IconButton.js
  - /node_modules/@mui/material/ImageList/ImageList.js
  - /node_modules/@mui/material/ImageListItem/ImageListItem.js
  - /node_modules/@mui/material/ImageListItemBar/ImageListItemBar.js
  - /node_modules/@mui/material/Input/Input.js
  - /node_modules/@mui/material/InputAdornment/InputAdornment.js
  - /node_modules/@mui/material/InputBase/InputBase.js
  - /node_modules/@mui/material/InputLabel/InputLabel.js
  - /node_modules/@mui/material/LinearProgress/LinearProgress.js
  - /node_modules/@mui/material/Link/Link.js
  - /node_modules/@mui/material/List/List.js
  - /node_modules/@mui/material/ListItem/ListItem.js
  - /node_modules/@mui/material/ListItemAvatar/ListItemAvatar.js
  - /node_modules/@mui/material/ListItemButton/ListItemButton.js
  - /node_modules/@mui/material/ListItemIcon/ListItemIcon.js
  - /node_modules/@mui/material/ListItemSecondaryAction/ListItemSecondaryAction.js
  - /node_modules/@mui/material/ListItemText/ListItemText.js
  - /node_modules/@mui/material/ListSubheader/ListSubheader.js
  - /node_modules/@mui/material/Menu/Menu.js
  - /node_modules/@mui/material/MenuItem/MenuItem.js
  - /node_modules/@mui/material/MenuList/MenuList.js
  - /node_modules/@mui/material/MobileStepper/MobileStepper.js
  - /node_modules/@mui/material/Modal/Modal.js
  - /node_modules/@mui/material/NativeSelect/NativeSelect.js
  - /node_modules/@mui/material/OutlinedInput/OutlinedInput.js
  - /node_modules/@mui/material/Pagination/Pagination.js
  - /node_modules/@mui/material/PaginationItem/PaginationItem.js
  - /node_modules/@mui/material/Paper/Paper.js
  - /node_modules/@mui/material/Popover/Popover.js
  - /node_modules/@mui/material/Radio/Radio.js
  - /node_modules/@mui/material/RadioGroup/RadioGroup.js
  - /node_modules/@mui/material/Rating/Rating.js
  - /node_modules/@mui/material/ScopedCssBaseline/ScopedCssBaseline.js
  - /node_modules/@mui/material/Select/Select.js
  - /node_modules/@mui/material/Skeleton/Skeleton.js
  - /node_modules/@mui/material/Slide/Slide.js
  - /node_modules/@mui/material/Slider/Slider.js
  - /node_modules/@mui/material/Snackbar/Snackbar.js
  - /node_modules/@mui/material/SnackbarContent/SnackbarContent.js
  - /node_modules/@mui/material/SpeedDial/SpeedDial.js
  - /node_modules/@mui/material/SpeedDialAction/SpeedDialAction.js
  - /node_modules/@mui/material/SpeedDialIcon/SpeedDialIcon.js
  - /node_modules/@mui/material/Stack/Stack.js
  - /node_modules/@mui/material/Step/Step.js
  - /node_modules/@mui/material/StepButton/StepButton.js
  - /node_modules/@mui/material/StepConnector/StepConnector.js
  - /node_modules/@mui/material/StepContent/StepContent.js
  - /node_modules/@mui/material/StepIcon/StepIcon.js
  - /node_modules/@mui/material/StepLabel/StepLabel.js
  - /node_modules/@mui/material/Stepper/Stepper.js
  - /node_modules/@mui/material/SvgIcon/SvgIcon.js
  - /node_modules/@mui/material/SwipeableDrawer/SwipeableDrawer.js
  - /node_modules/@mui/material/Switch/Switch.js
  - /node_modules/@mui/material/Tab/Tab.js
  - /node_modules/@mui/material/Table/Table.js
  - /node_modules/@mui/material/TableBody/TableBody.js
  - /node_modules/@mui/material/TableCell/TableCell.js
  - /node_modules/@mui/material/TableContainer/TableContainer.js
  - /node_modules/@mui/material/TableFooter/TableFooter.js
  - /node_modules/@mui/material/TableHead/TableHead.js
  - /node_modules/@mui/material/TablePagination/TablePagination.js
  - /node_modules/@mui/material/TableRow/TableRow.js
  - /node_modules/@mui/material/TableSortLabel/TableSortLabel.js
  - /node_modules/@mui/material/Tabs/Tabs.js
  - /node_modules/@mui/material/TabScrollButton/TabScrollButton.js
  - /node_modules/@mui/material/TextField/TextField.js
  - /node_modules/@mui/material/ToggleButton/ToggleButton.js
  - /node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js
  - /node_modules/@mui/material/Toolbar/Toolbar.js
  - /node_modules/@mui/material/Tooltip/Tooltip.js
  - /node_modules/@mui/material/Typography/Typography.js
  - /node_modules/@mui/material/usePagination/usePagination.js
  - /node_modules/@mui/material/Zoom/Zoom.js
  - /node_modules/@mui/material/styles/createPalette.js
  - /node_modules/@mui/material/styles/createTypography.js
  - /node_modules/@mui/material/ButtonBase/TouchRipple.js
  - /node_modules/@mui/material/internal/SwitchBase.js
  - /node_modules/@mui/material/Hidden/HiddenCss.js
  - /node_modules/@mui/material/NativeSelect/NativeSelectInput.js
  - /node_modules/@mui/material/OutlinedInput/NotchedOutline.js
  - /node_modules/@mui/material/Select/SelectInput.js
  - /node_modules/@mui/material/SwipeableDrawer/SwipeArea.js
  - /node_modules/@mui/material/TablePagination/TablePaginationActions.js
  - /node_modules/@mui/material/Tabs/ScrollbarSize.js
  - /node_modules/@mui/base/ModalUnstyled/ModalUnstyled.js
  - /node_modules/@mui/system/esm/createBox.js
  - /node_modules/@mui/system/esm/createStyled.js
  - /node_modules/@mui/system/esm/createTheme/createBreakpoints.js
  - /node_modules/@mui/system/esm/cssVars/createCssVarsProvider.js
  - /node_modules/@mui/system/esm/Container/createContainer.js
  - /node_modules/@mui/base/TextareaAutosize/TextareaAutosize.js
  - /node_modules/@mui/material/Hidden/withWidth.js
  - /node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.js
  - /node_modules/react-transition-group/esm/CSSTransition.js
  - /node_modules/react-transition-group/esm/ReplaceTransition.js
  - /node_modules/react-transition-group/esm/TransitionGroup.js
  - /node_modules/react-transition-group/esm/Transition.js
  - /node_modules/@mui/base/PopperUnstyled/PopperUnstyled.js
  - /node_modules/@mui/system/esm/propsToClassKey.js
  - /node_modules/@mui/base/SliderUnstyled/SliderUnstyled.js
  - /node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.js
  - /node_modules/@mui/base/FormControlUnstyled/FormControlUnstyled.js
  - /node_modules/@mui/base/InputUnstyled/InputUnstyled.js
  - /node_modules/@mui/system/esm/createTheme/createTheme.js
  - /node_modules/@mui/base/MenuUnstyled/MenuUnstyled.js
  - /node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js
  - /node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.js
  - /node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.js
  - /node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.js
  - /node_modules/@mui/base/OptionUnstyled/OptionUnstyled.js
  - /node_modules/@mui/base/SelectUnstyled/SelectUnstyled.js
  - /node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.js
  - /node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.js
  - /node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.js
  - /node_modules/@mui/base/TabsUnstyled/TabsUnstyled.js
  - /node_modules/@mui/base/TabUnstyled/TabUnstyled.js
  - /node_modules/@mui/base/TabUnstyled/useTab.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ToggleButtonGroup/isValueSelected.js
bundle space:    0.01 %
rendered size:   335 Bytes
original size:   350 Bytes
code reduction:  4.29 %
dependents:      1
  - /node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/Img/Img.tsx
bundle space:    0.01 %
rendered size:   333 Bytes
original size:   478 Bytes
code reduction:  30.33 %
dependents:      3
  - /src/components/payments/CheckoutModalHeader/CheckoutModalHeader.tsx
  - /src/components/shared/StatusIcon/StatusIcon.tsx
  - /src/components/payments/CheckoutModalFooter/CheckoutModalFooter.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/error/syntaxError.mjs
bundle space:    0.01 %
rendered size:   332 Bytes
original size:   378 Bytes
code reduction:  12.17 %
dependents:      2
  - /node_modules/graphql/language/parser.mjs
  - /node_modules/graphql/language/lexer.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/InputAdornment/inputAdornmentClasses.js
bundle space:    0.01 %
rendered size:   331 Bytes
original size:   428 Bytes
code reduction:  22.66 %
dependents:      1
  - /node_modules/@mui/material/InputAdornment/InputAdornment.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Switch/switchClasses.js
bundle space:    0.01 %
rendered size:   330 Bytes
original size:   419 Bytes
code reduction:  21.24 %
dependents:      1
  - /node_modules/@mui/material/Switch/Switch.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/StepLabel/stepLabelClasses.js
bundle space:    0.01 %
rendered size:   327 Bytes
original size:   419 Bytes
code reduction:  21.96 %
dependents:      1
  - /node_modules/@mui/material/StepLabel/StepLabel.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/IconButton/iconButtonClasses.js
bundle space:    0.01 %
rendered size:   323 Bytes
original size:   416 Bytes
code reduction:  22.36 %
dependents:      1
  - /node_modules/@mui/material/IconButton/IconButton.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/AccordionSummary/accordionSummaryClasses.js
bundle space:    0.01 %
rendered size:   322 Bytes
original size:   421 Bytes
code reduction:  23.52 %
dependents:      1
  - /node_modules/@mui/material/AccordionSummary/AccordionSummary.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/FormControlLabel/formControlLabelClasses.js
bundle space:    0.01 %
rendered size:   321 Bytes
original size:   420 Bytes
code reduction:  23.57 %
dependents:      1
  - /node_modules/@mui/material/FormControlLabel/FormControlLabel.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Snackbar/snackbarClasses.js
bundle space:    0.01 %
rendered size:   318 Bytes
original size:   433 Bytes
code reduction:  26.56 %
dependents:      1
  - /node_modules/@mui/material/Snackbar/Snackbar.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/InfoOutlined.js
bundle space:    0.01 %
rendered size:   316 Bytes
original size:   465 Bytes
code reduction:  32.04 %
dependents:      1
  - /node_modules/@mui/material/Alert/Alert.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/styles/createMixins.js
bundle space:    0.01 %
rendered size:   315 Bytes
original size:   378 Bytes
code reduction:  16.67 %
dependents:      1
  - /node_modules/@mui/material/styles/createTheme.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/InputLabel/inputLabelClasses.js
bundle space:    0.01 %
rendered size:   313 Bytes
original size:   432 Bytes
code reduction:  27.55 %
dependents:      1
  - /node_modules/@mui/material/InputLabel/InputLabel.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/SvgIcon/svgIconClasses.js
bundle space:    0.01 %
rendered size:   313 Bytes
original size:   426 Bytes
code reduction:  26.53 %
dependents:      1
  - /node_modules/@mui/material/SvgIcon/SvgIcon.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/utils/promiseUtils.ts
bundle space:    0.01 %
rendered size:   312 Bytes
original size:   353 Bytes
code reduction:  11.61 %
dependents:      3
  - /src/components/payments/CheckoutModalFooter/CheckoutModalFooter.tsx
  - /src/hooks/useCreatePaymentMethod.ts
  - /src/components/shared/CopyButton/CopyButton.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ToggleButtonGroup/toggleButtonGroupClasses.js
bundle space:    0.01 %
rendered size:   312 Bytes
original size:   412 Bytes
code reduction:  24.27 %
dependents:      1
  - /node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/FormHelperText/formHelperTextClasses.js
bundle space:    0.01 %
rendered size:   309 Bytes
original size:   406 Bytes
code reduction:  23.89 %
dependents:      1
  - /node_modules/@mui/material/FormHelperText/FormHelperText.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/utils/resolveComponentProps.js
bundle space:    0.01 %
rendered size:   309 Bytes
original size:   324 Bytes
code reduction:  4.63 %
dependents:      1
  - /node_modules/@mui/base/InputUnstyled/InputUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ListItemButton/listItemButtonClasses.js
bundle space:    0.01 %
rendered size:   307 Bytes
original size:   404 Bytes
code reduction:  24.01 %
dependents:      1
  - /node_modules/@mui/material/ListItemButton/ListItemButton.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Tab/tabClasses.js
bundle space:    0.01 %
rendered size:   307 Bytes
original size:   393 Bytes
code reduction:  21.88 %
dependents:      1
  - /node_modules/@mui/material/Tab/Tab.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Accordion/AccordionContext.js
bundle space:    0.01 %
rendered size:   306 Bytes
original size:   361 Bytes
code reduction:  15.24 %
dependents:      2
  - /node_modules/@mui/material/Accordion/Accordion.js
  - /node_modules/@mui/material/AccordionSummary/AccordionSummary.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ImageList/ImageListContext.js
bundle space:    0.01 %
rendered size:   306 Bytes
original size:   361 Bytes
code reduction:  15.24 %
dependents:      2
  - /node_modules/@mui/material/ImageList/ImageList.js
  - /node_modules/@mui/material/ImageListItem/ImageListItem.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ToggleButton/toggleButtonClasses.js
bundle space:    0.01 %
rendered size:   305 Bytes
original size:   400 Bytes
code reduction:  23.75 %
dependents:      1
  - /node_modules/@mui/material/ToggleButton/ToggleButton.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Icon/iconClasses.js
bundle space:    0.01 %
rendered size:   304 Bytes
original size:   411 Bytes
code reduction:  26.03 %
dependents:      1
  - /node_modules/@mui/material/Icon/Icon.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/StepConnector/stepConnectorClasses.js
bundle space:    0.01 %
rendered size:   303 Bytes
original size:   428 Bytes
code reduction:  29.21 %
dependents:      1
  - /node_modules/@mui/material/StepConnector/StepConnector.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/FormControl/formControlState.js
bundle space:    0.01 %
rendered size:   303 Bytes
original size:   318 Bytes
code reduction:  4.72 %
dependents:      9
  - /node_modules/@mui/material/FormControlLabel/FormControlLabel.js
  - /node_modules/@mui/material/FormGroup/FormGroup.js
  - /node_modules/@mui/material/FormHelperText/FormHelperText.js
  - /node_modules/@mui/material/FormLabel/FormLabel.js
  - /node_modules/@mui/material/InputBase/InputBase.js
  - /node_modules/@mui/material/InputLabel/InputLabel.js
  - /node_modules/@mui/material/NativeSelect/NativeSelect.js
  - /node_modules/@mui/material/OutlinedInput/OutlinedInput.js
  - /node_modules/@mui/material/Select/Select.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/StarBorder.js
bundle space:    0.01 %
rendered size:   299 Bytes
original size:   454 Bytes
code reduction:  34.14 %
dependents:      1
  - /node_modules/@mui/material/Rating/Rating.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/RadioButtonChecked.js
bundle space:    0.01 %
rendered size:   298 Bytes
original size:   441 Bytes
code reduction:  32.43 %
dependents:      1
  - /node_modules/@mui/material/Radio/RadioButtonIcon.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/globals/global.js
bundle space:    0.01 %
rendered size:   297 Bytes
original size:   332 Bytes
code reduction:  10.54 %
dependents:      2
  - /node_modules/@apollo/client/utilities/globals/index.js
  - /node_modules/@apollo/client/utilities/globals/DEV.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/SpeedDial/speedDialClasses.js
bundle space:    0.01 %
rendered size:   295 Bytes
original size:   387 Bytes
code reduction:  23.77 %
dependents:      1
  - /node_modules/@mui/material/SpeedDial/SpeedDial.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/useThemeProps/getThemeProps.js
bundle space:    0.01 %
rendered size:   295 Bytes
original size:   367 Bytes
code reduction:  19.62 %
dependents:      1
  - /node_modules/@mui/system/esm/useThemeProps/useThemeProps.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/jsutils/mapValue.mjs
bundle space:    0.01 %
rendered size:   295 Bytes
original size:   303 Bytes
code reduction:  2.64 %
dependents:      2
  - /node_modules/graphql/type/definition.mjs
  - /node_modules/graphql/utilities/extendSchema.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/OutlinedInput/outlinedInputClasses.js
bundle space:    0.01 %
rendered size:   291 Bytes
original size:   474 Bytes
code reduction:  38.61 %
dependents:      2
  - /node_modules/@mui/material/Autocomplete/Autocomplete.js
  - /node_modules/@mui/material/OutlinedInput/OutlinedInput.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/debounce.js
bundle space:    0.01 %
rendered size:   287 Bytes
original size:   302 Bytes
code reduction:  4.97 %
dependents:      1
  - /node_modules/@popperjs/core/lib/createPopper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/ErrorOutline.js
bundle space:    0.01 %
rendered size:   282 Bytes
original size:   431 Bytes
code reduction:  34.57 %
dependents:      1
  - /node_modules/@mui/material/Alert/Alert.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/http/createSignalIfSupported.js
bundle space:    0.01 %
rendered size:   282 Bytes
original size:   341 Bytes
code reduction:  17.3 %
dependents:      1
  - /node_modules/@apollo/client/link/http/createHttpLink.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/SpeedDialIcon/speedDialIconClasses.js
bundle space:    0.01 %
rendered size:   281 Bytes
original size:   377 Bytes
code reduction:  25.46 %
dependents:      1
  - /node_modules/@mui/material/SpeedDialIcon/SpeedDialIcon.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/FormLabel/formLabelClasses.js
bundle space:    0.01 %
rendered size:   279 Bytes
original size:   371 Bytes
code reduction:  24.8 %
dependents:      1
  - /node_modules/@mui/material/FormLabel/FormLabel.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/observables/subclassing.js
bundle space:    0.01 %
rendered size:   279 Bytes
original size:   408 Bytes
code reduction:  31.62 %
dependents:      1
  - /node_modules/@apollo/client/utilities/observables/Concast.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/jsutils/toObjMap.mjs
bundle space:    0.01 %
rendered size:   279 Bytes
original size:   287 Bytes
code reduction:  2.79 %
dependents:      2
  - /node_modules/graphql/type/definition.mjs
  - /node_modules/graphql/type/directives.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/BottomNavigationAction/bottomNavigationActionClasses.js
bundle space:    0.01 %
rendered size:   278 Bytes
original size:   383 Bytes
code reduction:  27.42 %
dependents:      1
  - /node_modules/@mui/material/BottomNavigationAction/BottomNavigationAction.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/FilledInput/filledInputClasses.js
bundle space:    0.01 %
rendered size:   278 Bytes
original size:   459 Bytes
code reduction:  39.43 %
dependents:      2
  - /node_modules/@mui/material/Autocomplete/Autocomplete.js
  - /node_modules/@mui/material/FilledInput/FilledInput.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/Cancel.js
bundle space:    0.01 %
rendered size:   278 Bytes
original size:   433 Bytes
code reduction:  35.8 %
dependents:      1
  - /node_modules/@mui/material/Chip/Chip.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/observables/iteration.js
bundle space:    0.01 %
rendered size:   277 Bytes
original size:   322 Bytes
code reduction:  13.98 %
dependents:      1
  - /node_modules/@apollo/client/utilities/observables/Concast.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/colors/lightBlue.js
bundle space:    0.01 %
rendered size:   276 Bytes
original size:   302 Bytes
code reduction:  8.61 %
dependents:      1
  - /node_modules/@mui/material/styles/createPalette.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/common/stringifyForDisplay.js
bundle space:    0.01 %
rendered size:   274 Bytes
original size:   366 Bytes
code reduction:  25.14 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/colors/purple.js
bundle space:    0.01 %
rendered size:   273 Bytes
original size:   296 Bytes
code reduction:  7.77 %
dependents:      1
  - /node_modules/@mui/material/styles/createPalette.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/colors/orange.js
bundle space:    0.01 %
rendered size:   273 Bytes
original size:   296 Bytes
code reduction:  7.77 %
dependents:      1
  - /node_modules/@mui/material/styles/createPalette.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/FormErrorCaption/FormErrorCaption.tsx
bundle space:    0.01 %
rendered size:   272 Bytes
original size:   404 Bytes
code reduction:  32.67 %
dependents:      3
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.tsx
  - /src/components/shared/TaxesMessagesBox/TaxesMessagesBox.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/colors/green.js
bundle space:    0.01 %
rendered size:   272 Bytes
original size:   294 Bytes
code reduction:  7.48 %
dependents:      1
  - /node_modules/@mui/material/styles/createPalette.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TableSortLabel/tableSortLabelClasses.js
bundle space:    0.01 %
rendered size:   272 Bytes
original size:   369 Bytes
code reduction:  26.29 %
dependents:      1
  - /node_modules/@mui/material/TableSortLabel/TableSortLabel.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/colors/blue.js
bundle space:    0.01 %
rendered size:   271 Bytes
original size:   292 Bytes
code reduction:  7.19 %
dependents:      1
  - /node_modules/@mui/material/styles/createPalette.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/colors/grey.js
bundle space:    0.01 %
rendered size:   271 Bytes
original size:   292 Bytes
code reduction:  7.19 %
dependents:      1
  - /node_modules/@mui/material/styles/createPalette.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/MobileStepper/mobileStepperClasses.js
bundle space:    0.01 %
rendered size:   271 Bytes
original size:   396 Bytes
code reduction:  31.57 %
dependents:      1
  - /node_modules/@mui/material/MobileStepper/MobileStepper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/format.js
bundle space:    0.01 %
rendered size:   271 Bytes
original size:   286 Bytes
code reduction:  5.24 %
dependents:      1
  - /node_modules/@popperjs/core/lib/utils/validateModifiers.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/colors/red.js
bundle space:    0.01 %
rendered size:   270 Bytes
original size:   290 Bytes
code reduction:  6.9 %
dependents:      1
  - /node_modules/@mui/material/styles/createPalette.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/styles/styled.js
bundle space:    0.01 %
rendered size:   269 Bytes
original size:   350 Bytes
code reduction:  23.14 %
dependents:      120
  - /node_modules/@mui/material/Accordion/Accordion.js
  - /node_modules/@mui/material/AccordionActions/AccordionActions.js
  - /node_modules/@mui/material/AccordionDetails/AccordionDetails.js
  - /node_modules/@mui/material/AccordionSummary/AccordionSummary.js
  - /node_modules/@mui/material/Alert/Alert.js
  - /node_modules/@mui/material/AlertTitle/AlertTitle.js
  - /node_modules/@mui/material/AppBar/AppBar.js
  - /node_modules/@mui/material/Autocomplete/Autocomplete.js
  - /node_modules/@mui/material/Avatar/Avatar.js
  - /node_modules/@mui/material/AvatarGroup/AvatarGroup.js
  - /node_modules/@mui/material/Backdrop/Backdrop.js
  - /node_modules/@mui/material/Badge/Badge.js
  - /node_modules/@mui/material/BottomNavigation/BottomNavigation.js
  - /node_modules/@mui/material/BottomNavigationAction/BottomNavigationAction.js
  - /node_modules/@mui/material/Breadcrumbs/Breadcrumbs.js
  - /node_modules/@mui/material/Button/Button.js
  - /node_modules/@mui/material/ButtonBase/ButtonBase.js
  - /node_modules/@mui/material/ButtonGroup/ButtonGroup.js
  - /node_modules/@mui/material/Card/Card.js
  - /node_modules/@mui/material/CardActionArea/CardActionArea.js
  - /node_modules/@mui/material/CardActions/CardActions.js
  - /node_modules/@mui/material/CardContent/CardContent.js
  - /node_modules/@mui/material/CardHeader/CardHeader.js
  - /node_modules/@mui/material/CardMedia/CardMedia.js
  - /node_modules/@mui/material/Checkbox/Checkbox.js
  - /node_modules/@mui/material/Chip/Chip.js
  - /node_modules/@mui/material/CircularProgress/CircularProgress.js
  - /node_modules/@mui/material/Collapse/Collapse.js
  - /node_modules/@mui/material/Container/Container.js
  - /node_modules/@mui/material/Dialog/Dialog.js
  - /node_modules/@mui/material/DialogActions/DialogActions.js
  - /node_modules/@mui/material/DialogContent/DialogContent.js
  - /node_modules/@mui/material/DialogContentText/DialogContentText.js
  - /node_modules/@mui/material/DialogTitle/DialogTitle.js
  - /node_modules/@mui/material/Divider/Divider.js
  - /node_modules/@mui/material/Drawer/Drawer.js
  - /node_modules/@mui/material/Fab/Fab.js
  - /node_modules/@mui/material/FilledInput/FilledInput.js
  - /node_modules/@mui/material/FormControl/FormControl.js
  - /node_modules/@mui/material/FormControlLabel/FormControlLabel.js
  - /node_modules/@mui/material/FormGroup/FormGroup.js
  - /node_modules/@mui/material/FormHelperText/FormHelperText.js
  - /node_modules/@mui/material/FormLabel/FormLabel.js
  - /node_modules/@mui/material/Grid/Grid.js
  - /node_modules/@mui/material/Icon/Icon.js
  - /node_modules/@mui/material/IconButton/IconButton.js
  - /node_modules/@mui/material/ImageList/ImageList.js
  - /node_modules/@mui/material/ImageListItem/ImageListItem.js
  - /node_modules/@mui/material/ImageListItemBar/ImageListItemBar.js
  - /node_modules/@mui/material/Input/Input.js
  - /node_modules/@mui/material/InputAdornment/InputAdornment.js
  - /node_modules/@mui/material/InputBase/InputBase.js
  - /node_modules/@mui/material/InputLabel/InputLabel.js
  - /node_modules/@mui/material/LinearProgress/LinearProgress.js
  - /node_modules/@mui/material/Link/Link.js
  - /node_modules/@mui/material/List/List.js
  - /node_modules/@mui/material/ListItem/ListItem.js
  - /node_modules/@mui/material/ListItemAvatar/ListItemAvatar.js
  - /node_modules/@mui/material/ListItemButton/ListItemButton.js
  - /node_modules/@mui/material/ListItemIcon/ListItemIcon.js
  - /node_modules/@mui/material/ListItemSecondaryAction/ListItemSecondaryAction.js
  - /node_modules/@mui/material/ListItemText/ListItemText.js
  - /node_modules/@mui/material/ListSubheader/ListSubheader.js
  - /node_modules/@mui/material/Menu/Menu.js
  - /node_modules/@mui/material/MenuItem/MenuItem.js
  - /node_modules/@mui/material/MobileStepper/MobileStepper.js
  - /node_modules/@mui/material/Modal/Modal.js
  - /node_modules/@mui/material/OutlinedInput/OutlinedInput.js
  - /node_modules/@mui/material/Pagination/Pagination.js
  - /node_modules/@mui/material/PaginationItem/PaginationItem.js
  - /node_modules/@mui/material/Paper/Paper.js
  - /node_modules/@mui/material/Popover/Popover.js
  - /node_modules/@mui/material/Radio/Radio.js
  - /node_modules/@mui/material/Rating/Rating.js
  - /node_modules/@mui/material/ScopedCssBaseline/ScopedCssBaseline.js
  - /node_modules/@mui/material/Select/Select.js
  - /node_modules/@mui/material/Skeleton/Skeleton.js
  - /node_modules/@mui/material/Slider/Slider.js
  - /node_modules/@mui/material/Snackbar/Snackbar.js
  - /node_modules/@mui/material/SnackbarContent/SnackbarContent.js
  - /node_modules/@mui/material/SpeedDial/SpeedDial.js
  - /node_modules/@mui/material/SpeedDialAction/SpeedDialAction.js
  - /node_modules/@mui/material/SpeedDialIcon/SpeedDialIcon.js
  - /node_modules/@mui/material/Stack/Stack.js
  - /node_modules/@mui/material/Step/Step.js
  - /node_modules/@mui/material/StepButton/StepButton.js
  - /node_modules/@mui/material/StepConnector/StepConnector.js
  - /node_modules/@mui/material/StepContent/StepContent.js
  - /node_modules/@mui/material/StepIcon/StepIcon.js
  - /node_modules/@mui/material/StepLabel/StepLabel.js
  - /node_modules/@mui/material/Stepper/Stepper.js
  - /node_modules/@mui/material/SvgIcon/SvgIcon.js
  - /node_modules/@mui/material/Switch/Switch.js
  - /node_modules/@mui/material/Tab/Tab.js
  - /node_modules/@mui/material/Table/Table.js
  - /node_modules/@mui/material/TableBody/TableBody.js
  - /node_modules/@mui/material/TableCell/TableCell.js
  - /node_modules/@mui/material/TableContainer/TableContainer.js
  - /node_modules/@mui/material/TableFooter/TableFooter.js
  - /node_modules/@mui/material/TableHead/TableHead.js
  - /node_modules/@mui/material/TablePagination/TablePagination.js
  - /node_modules/@mui/material/TableRow/TableRow.js
  - /node_modules/@mui/material/TableSortLabel/TableSortLabel.js
  - /node_modules/@mui/material/Tabs/Tabs.js
  - /node_modules/@mui/material/TabScrollButton/TabScrollButton.js
  - /node_modules/@mui/material/TextField/TextField.js
  - /node_modules/@mui/material/ToggleButton/ToggleButton.js
  - /node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js
  - /node_modules/@mui/material/Toolbar/Toolbar.js
  - /node_modules/@mui/material/Tooltip/Tooltip.js
  - /node_modules/@mui/material/Typography/Typography.js
  - /node_modules/@mui/material/Breadcrumbs/BreadcrumbCollapsed.js
  - /node_modules/@mui/material/ButtonBase/TouchRipple.js
  - /node_modules/@mui/material/internal/SwitchBase.js
  - /node_modules/@mui/material/Hidden/HiddenCss.js
  - /node_modules/@mui/material/NativeSelect/NativeSelectInput.js
  - /node_modules/@mui/material/OutlinedInput/NotchedOutline.js
  - /node_modules/@mui/material/Radio/RadioButtonIcon.js
  - /node_modules/@mui/material/Select/SelectInput.js
  - /node_modules/@mui/material/SwipeableDrawer/SwipeArea.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/cache/core/types/common.js
bundle space:    0.01 %
rendered size:   268 Bytes
original size:   333 Bytes
code reduction:  19.52 %
dependents:      2
  - /node_modules/@apollo/client/cache/inmemory/inMemoryCache.js
  - /node_modules/@apollo/client/cache/inmemory/readFromStore.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/utils/typescriptUtils.ts
bundle space:    0.01 %
rendered size:   265 Bytes
original size:   415 Bytes
code reduction:  36.14 %
dependents:      1
  - /src/hooks/useCheckoutItemCostTotal.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/responsivePropType.js
bundle space:    0.01 %
rendered size:   265 Bytes
original size:   236 Bytes
code reduction:  0 %
dependents:      4
  - /node_modules/@mui/system/esm/borders.js
  - /node_modules/@mui/system/esm/grid.js
  - /node_modules/@mui/system/esm/spacing.js
  - /node_modules/@mui/system/esm/style.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/SelectUnstyled/selectUnstyledClasses.js
bundle space:    0.01 %
rendered size:   264 Bytes
original size:   441 Bytes
code reduction:  40.14 %
dependents:      2
  - /node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.js
  - /node_modules/@mui/base/SelectUnstyled/SelectUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/private-theming/useTheme/useTheme.js
bundle space:    0.01 %
rendered size:   264 Bytes
original size:   321 Bytes
code reduction:  17.76 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Checkbox/checkboxClasses.js
bundle space:    0.01 %
rendered size:   263 Bytes
original size:   354 Bytes
code reduction:  25.71 %
dependents:      1
  - /node_modules/@mui/material/Checkbox/Checkbox.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/common/filterInPlace.js
bundle space:    0.01 %
rendered size:   262 Bytes
original size:   311 Bytes
code reduction:  15.76 %
dependents:      1
  - /node_modules/@apollo/client/utilities/graphql/transform.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
bundle space:    0.01 %
rendered size:   262 Bytes
original size:   311 Bytes
code reduction:  15.76 %
dependents:      8
  - /node_modules/@popperjs/core/lib/modifiers/computeStyles.js
  - /node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
  - /node_modules/@popperjs/core/lib/utils/detectOverflow.js
  - /node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
  - /node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
  - /node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
  - /node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
  - /node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Skeleton/skeletonClasses.js
bundle space:    0.01 %
rendered size:   261 Bytes
original size:   376 Bytes
code reduction:  30.59 %
dependents:      1
  - /node_modules/@mui/material/Skeleton/Skeleton.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ListItemText/listItemTextClasses.js
bundle space:    0.01 %
rendered size:   260 Bytes
original size:   355 Bytes
code reduction:  26.76 %
dependents:      1
  - /node_modules/@mui/material/ListItemText/ListItemText.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/MenuItem/menuItemClasses.js
bundle space:    0.01 %
rendered size:   260 Bytes
original size:   351 Bytes
code reduction:  25.93 %
dependents:      1
  - /node_modules/@mui/material/MenuItem/MenuItem.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ImageListItem/imageListItemClasses.js
bundle space:    0.01 %
rendered size:   259 Bytes
original size:   355 Bytes
code reduction:  27.04 %
dependents:      1
  - /node_modules/@mui/material/ImageListItem/ImageListItem.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/styles/useTheme.js
bundle space:    0.01 %
rendered size:   258 Bytes
original size:   377 Bytes
code reduction:  31.56 %
dependents:      23
  - /node_modules/@mui/material/Collapse/Collapse.js
  - /node_modules/@mui/material/Dialog/Dialog.js
  - /node_modules/@mui/material/Drawer/Drawer.js
  - /node_modules/@mui/material/Fade/Fade.js
  - /node_modules/@mui/material/Grow/Grow.js
  - /node_modules/@mui/material/LinearProgress/LinearProgress.js
  - /node_modules/@mui/material/Menu/Menu.js
  - /node_modules/@mui/material/PaginationItem/PaginationItem.js
  - /node_modules/@mui/material/Paper/Paper.js
  - /node_modules/@mui/material/Rating/Rating.js
  - /node_modules/@mui/material/Slide/Slide.js
  - /node_modules/@mui/material/Slider/Slider.js
  - /node_modules/@mui/material/Snackbar/Snackbar.js
  - /node_modules/@mui/material/SpeedDial/SpeedDial.js
  - /node_modules/@mui/material/SwipeableDrawer/SwipeableDrawer.js
  - /node_modules/@mui/material/Tabs/Tabs.js
  - /node_modules/@mui/material/TabScrollButton/TabScrollButton.js
  - /node_modules/@mui/material/Tooltip/Tooltip.js
  - /node_modules/@mui/material/Zoom/Zoom.js
  - /node_modules/@mui/material/Hidden/HiddenJs.js
  - /node_modules/@mui/material/Hidden/HiddenCss.js
  - /node_modules/@mui/material/TablePagination/TablePaginationActions.js
  - /node_modules/@mui/material/Hidden/withWidth.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getWindow.js
bundle space:    0.01 %
rendered size:   258 Bytes
original size:   273 Bytes
code reduction:  5.49 %
dependents:      9
  - /node_modules/@popperjs/core/lib/modifiers/eventListeners.js
  - /node_modules/@popperjs/core/lib/modifiers/computeStyles.js
  - /node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
  - /node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
  - /node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
  - /node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
  - /node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
  - /node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
  - /node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/MoreHoriz.js
bundle space:    0.01 %
rendered size:   256 Bytes
original size:   408 Bytes
code reduction:  37.25 %
dependents:      1
  - /node_modules/@mui/material/Breadcrumbs/BreadcrumbCollapsed.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TabScrollButton/tabScrollButtonClasses.js
bundle space:    0.01 %
rendered size:   255 Bytes
original size:   353 Bytes
code reduction:  27.76 %
dependents:      1
  - /node_modules/@mui/material/TabScrollButton/TabScrollButton.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/RadioButtonUnchecked.js
bundle space:    0.01 %
rendered size:   255 Bytes
original size:   396 Bytes
code reduction:  35.61 %
dependents:      1
  - /node_modules/@mui/material/Radio/RadioButtonIcon.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Input/inputClasses.js
bundle space:    0.01 %
rendered size:   254 Bytes
original size:   429 Bytes
code reduction:  40.79 %
dependents:      2
  - /node_modules/@mui/material/Autocomplete/Autocomplete.js
  - /node_modules/@mui/material/Input/Input.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/styles/zIndex.js
bundle space:    0.01 %
rendered size:   254 Bytes
original size:   277 Bytes
code reduction:  8.3 %
dependents:      1
  - /node_modules/@mui/material/styles/createTheme.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Link/linkClasses.js
bundle space:    0.01 %
rendered size:   253 Bytes
original size:   340 Bytes
code reduction:  25.59 %
dependents:      1
  - /node_modules/@mui/material/Link/Link.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/FormControlUnstyled/FormControlUnstyledContext.js
bundle space:    0.01 %
rendered size:   252 Bytes
original size:   318 Bytes
code reduction:  20.75 %
dependents:      2
  - /node_modules/@mui/base/FormControlUnstyled/FormControlUnstyled.js
  - /node_modules/@mui/base/FormControlUnstyled/useFormControlUnstyledContext.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/CardHeader/cardHeaderClasses.js
bundle space:    0.01 %
rendered size:   250 Bytes
original size:   343 Bytes
code reduction:  27.11 %
dependents:      1
  - /node_modules/@mui/material/CardHeader/CardHeader.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Accordion/accordionClasses.js
bundle space:    0.01 %
rendered size:   249 Bytes
original size:   341 Bytes
code reduction:  26.98 %
dependents:      1
  - /node_modules/@mui/material/Accordion/Accordion.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Avatar/avatarClasses.js
bundle space:    0.01 %
rendered size:   249 Bytes
original size:   338 Bytes
code reduction:  26.33 %
dependents:      1
  - /node_modules/@mui/material/Avatar/Avatar.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/common/makeUniqueId.js
bundle space:    0.01 %
rendered size:   249 Bytes
original size:   297 Bytes
code reduction:  16.16 %
dependents:      1
  - /node_modules/@apollo/client/utilities/common/stringifyForDisplay.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/useThemeWithoutDefault.js
bundle space:    0.01 %
rendered size:   248 Bytes
original size:   329 Bytes
code reduction:  24.62 %
dependents:      1
  - /node_modules/@mui/system/esm/useTheme.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/CardActionArea/cardActionAreaClasses.js
bundle space:    0.01 %
rendered size:   247 Bytes
original size:   344 Bytes
code reduction:  28.2 %
dependents:      1
  - /node_modules/@mui/material/CardActionArea/CardActionArea.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/utils/throwServerError.js
bundle space:    0.01 %
rendered size:   247 Bytes
original size:   299 Bytes
code reduction:  17.39 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/FormControl/formControlClasses.js
bundle space:    0.01 %
rendered size:   246 Bytes
original size:   367 Bytes
code reduction:  32.97 %
dependents:      1
  - /node_modules/@mui/material/FormControl/FormControl.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ListSubheader/listSubheaderClasses.js
bundle space:    0.01 %
rendered size:   242 Bytes
original size:   367 Bytes
code reduction:  34.06 %
dependents:      1
  - /node_modules/@mui/material/ListSubheader/ListSubheader.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/version.mjs
bundle space:    0.01 %
rendered size:   240 Bytes
original size:   422 Bytes
code reduction:  43.13 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Collapse/collapseClasses.js
bundle space:    0.01 %
rendered size:   239 Bytes
original size:   354 Bytes
code reduction:  32.49 %
dependents:      1
  - /node_modules/@mui/material/Collapse/Collapse.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/ponyfillGlobal.js
bundle space:    0.01 %
rendered size:   239 Bytes
original size:   254 Bytes
code reduction:  5.91 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/StepButton/stepButtonClasses.js
bundle space:    0.01 %
rendered size:   238 Bytes
original size:   331 Bytes
code reduction:  28.1 %
dependents:      1
  - /node_modules/@mui/material/StepButton/StepButton.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/CheckBox.js
bundle space:    0.01 %
rendered size:   238 Bytes
original size:   391 Bytes
code reduction:  39.13 %
dependents:      1
  - /node_modules/@mui/material/Checkbox/Checkbox.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/common/mergeOptions.js
bundle space:    0.01 %
rendered size:   237 Bytes
original size:   331 Bytes
code reduction:  28.4 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/uniqueBy.js
bundle space:    0.01 %
rendered size:   237 Bytes
original size:   252 Bytes
code reduction:  5.95 %
dependents:      1
  - /node_modules/@popperjs/core/lib/createPopper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ListItemSecondaryAction/listItemSecondaryActionClasses.js
bundle space:    0.01 %
rendered size:   235 Bytes
original size:   380 Bytes
code reduction:  38.16 %
dependents:      1
  - /node_modules/@mui/material/ListItemSecondaryAction/ListItemSecondaryAction.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Stepper/StepperContext.js
bundle space:    0.01 %
rendered size:   235 Bytes
original size:   502 Bytes
code reduction:  53.19 %
dependents:      6
  - /node_modules/@mui/material/Step/Step.js
  - /node_modules/@mui/material/StepButton/StepButton.js
  - /node_modules/@mui/material/StepConnector/StepConnector.js
  - /node_modules/@mui/material/StepContent/StepContent.js
  - /node_modules/@mui/material/StepLabel/StepLabel.js
  - /node_modules/@mui/material/Stepper/Stepper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/switchBaseClasses.js
bundle space:    0.01 %
rendered size:   235 Bytes
original size:   354 Bytes
code reduction:  33.62 %
dependents:      1
  - /node_modules/@mui/material/internal/SwitchBase.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Radio/radioClasses.js
bundle space:    0.01 %
rendered size:   234 Bytes
original size:   322 Bytes
code reduction:  27.33 %
dependents:      1
  - /node_modules/@mui/material/Radio/Radio.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
bundle space:    0.01 %
rendered size:   233 Bytes
original size:   248 Bytes
code reduction:  6.05 %
dependents:      1
  - /node_modules/@popperjs/core/lib/modifiers/flip.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/CheckoutModalHeader/CheckoutModalHeader.utils.ts
bundle space:    0.01 %
rendered size:   230 Bytes
original size:   498 Bytes
code reduction:  53.82 %
dependents:      1
  - /src/components/payments/CheckoutModalHeader/CheckoutModalHeader.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/index.ts
bundle space:    0.01 %
rendered size:   229 Bytes
original size:   2.368 KB
code reduction:  90.33 %
dependents:      1
  - /src/index.ts?commonjs-entry

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/StepIcon/stepIconClasses.js
bundle space:    0.01 %
rendered size:   229 Bytes
original size:   320 Bytes
code reduction:  28.44 %
dependents:      1
  - /node_modules/@mui/material/StepIcon/StepIcon.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ListItemIcon/listItemIconClasses.js
bundle space:    0.01 %
rendered size:   228 Bytes
original size:   323 Bytes
code reduction:  29.41 %
dependents:      1
  - /node_modules/@mui/material/ListItemIcon/ListItemIcon.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TableRow/tableRowClasses.js
bundle space:    0.01 %
rendered size:   228 Bytes
original size:   319 Bytes
code reduction:  28.53 %
dependents:      1
  - /node_modules/@mui/material/TableRow/TableRow.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Breadcrumbs/breadcrumbsClasses.js
bundle space:    0.01 %
rendered size:   226 Bytes
original size:   320 Bytes
code reduction:  29.38 %
dependents:      1
  - /node_modules/@mui/material/Breadcrumbs/Breadcrumbs.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Step/StepContext.js
bundle space:    0.01 %
rendered size:   226 Bytes
original size:   478 Bytes
code reduction:  52.72 %
dependents:      5
  - /node_modules/@mui/material/Step/Step.js
  - /node_modules/@mui/material/StepButton/StepButton.js
  - /node_modules/@mui/material/StepConnector/StepConnector.js
  - /node_modules/@mui/material/StepContent/StepContent.js
  - /node_modules/@mui/material/StepLabel/StepLabel.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/IndeterminateCheckBox.js
bundle space:    0.01 %
rendered size:   226 Bytes
original size:   366 Bytes
code reduction:  38.25 %
dependents:      1
  - /node_modules/@mui/material/Checkbox/Checkbox.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ButtonBase/buttonBaseClasses.js
bundle space:    0.01 %
rendered size:   225 Bytes
original size:   318 Bytes
code reduction:  29.25 %
dependents:      1
  - /node_modules/@mui/material/ButtonBase/ButtonBase.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/RadioGroup/RadioGroupContext.js
bundle space:    0.01 %
rendered size:   225 Bytes
original size:   282 Bytes
code reduction:  20.21 %
dependents:      2
  - /node_modules/@mui/material/RadioGroup/RadioGroup.js
  - /node_modules/@mui/material/RadioGroup/useRadioGroup.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/globals/index.js
bundle space:    0.01 %
rendered size:   223 Bytes
original size:   484 Bytes
code reduction:  53.93 %
dependents:      30
  - /node_modules/@apollo/client/core/index.js
  - /node_modules/@apollo/client/core/ApolloClient.js
  - /node_modules/@apollo/client/core/ObservableQuery.js
  - /node_modules/@apollo/client/errors/index.js
  - /node_modules/@apollo/client/react/parser/index.js
  - /node_modules/@apollo/client/core/QueryManager.js
  - /node_modules/@apollo/client/core/LocalState.js
  - /node_modules/@apollo/client/cache/inmemory/entityStore.js
  - /node_modules/@apollo/client/cache/inmemory/inMemoryCache.js
  - /node_modules/@apollo/client/cache/inmemory/policies.js
  - /node_modules/@apollo/client/cache/inmemory/object-canon.js
  - /node_modules/@apollo/client/utilities/graphql/directives.js
  - /node_modules/@apollo/client/utilities/graphql/fragments.js
  - /node_modules/@apollo/client/utilities/graphql/getFromAST.js
  - /node_modules/@apollo/client/utilities/graphql/storeUtils.js
  - /node_modules/@apollo/client/utilities/graphql/transform.js
  - /node_modules/@apollo/client/utilities/common/maybeDeepFreeze.js
  - /node_modules/@apollo/client/utilities/common/canUse.js
  - /node_modules/@apollo/client/link/core/ApolloLink.js
  - /node_modules/@apollo/client/link/http/serializeFetchParameter.js
  - /node_modules/@apollo/client/link/http/checkFetcher.js
  - /node_modules/@apollo/client/link/http/createHttpLink.js
  - /node_modules/@apollo/client/link/utils/validateOperation.js
  - /node_modules/@apollo/client/react/context/ApolloProvider.js
  - /node_modules/@apollo/client/react/hooks/useApolloClient.js
  - /node_modules/@apollo/client/react/hooks/useQuery.js
  - /node_modules/@apollo/client/cache/inmemory/readFromStore.js
  - /node_modules/@apollo/client/cache/inmemory/writeToStore.js
  - /node_modules/@apollo/client/cache/inmemory/key-extractor.js
  - /node_modules/@apollo/client/react/hooks/useSyncExternalStore.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/useThemeProps/useThemeProps.js
bundle space:    0.01 %
rendered size:   222 Bytes
original size:   296 Bytes
code reduction:  25 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/OptionUnstyled/optionUnstyledClasses.js
bundle space:    0.01 %
rendered size:   222 Bytes
original size:   399 Bytes
code reduction:  44.36 %
dependents:      1
  - /node_modules/@mui/base/OptionUnstyled/OptionUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
bundle space:    0.01 %
rendered size:   222 Bytes
original size:   396 Bytes
code reduction:  43.94 %
dependents:      1
  - /node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ButtonGroup/ButtonGroupContext.js
bundle space:    0.01 %
rendered size:   221 Bytes
original size:   279 Bytes
code reduction:  20.79 %
dependents:      2
  - /node_modules/@mui/material/Button/Button.js
  - /node_modules/@mui/material/ButtonGroup/ButtonGroup.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/CheckBoxOutlineBlank.js
bundle space:    0.01 %
rendered size:   221 Bytes
original size:   362 Bytes
code reduction:  38.95 %
dependents:      1
  - /node_modules/@mui/material/Checkbox/Checkbox.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/FormControl/FormControlContext.js
bundle space:    0.01 %
rendered size:   220 Bytes
original size:   277 Bytes
code reduction:  20.58 %
dependents:      4
  - /node_modules/@mui/material/FormControl/FormControl.js
  - /node_modules/@mui/material/FormControl/useFormControl.js
  - /node_modules/@mui/material/InputAdornment/InputAdornment.js
  - /node_modules/@mui/material/InputBase/InputBase.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/chainPropTypes.js
bundle space:    0.01 %
rendered size:   220 Bytes
original size:   235 Bytes
code reduction:  6.38 %
dependents:      2
  - /node_modules/@mui/utils/esm/elementAcceptingRef.js
  - /node_modules/@mui/utils/esm/elementTypeAcceptingRef.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/jsutils/isObjectLike.mjs
bundle space:    0.01 %
rendered size:   219 Bytes
original size:   227 Bytes
code reduction:  3.52 %
dependents:      5
  - /node_modules/graphql/type/definition.mjs
  - /node_modules/graphql/type/directives.mjs
  - /node_modules/graphql/type/scalars.mjs
  - /node_modules/graphql/error/GraphQLError.mjs
  - /node_modules/graphql/utilities/astFromValue.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/jsutils/invariant.mjs
bundle space:    0.01 %
rendered size:   218 Bytes
original size:   226 Bytes
code reduction:  3.54 %
dependents:      9
  - /node_modules/graphql/type/introspection.mjs
  - /node_modules/graphql/language/location.mjs
  - /node_modules/graphql/utilities/extendSchema.mjs
  - /node_modules/graphql/utilities/valueFromAST.mjs
  - /node_modules/graphql/utilities/astFromValue.mjs
  - /node_modules/graphql/utilities/findBreakingChanges.mjs
  - /node_modules/graphql/validation/rules/KnownDirectivesRule.mjs
  - /node_modules/graphql/validation/rules/UniqueInputFieldNamesRule.mjs
  - /node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/InputUnstyled/inputUnstyledClasses.js
bundle space:    0.01 %
rendered size:   217 Bytes
original size:   467 Bytes
code reduction:  53.53 %
dependents:      1
  - /node_modules/@mui/base/InputUnstyled/InputUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/MenuItemUnstyled/menuItemUnstyledClasses.js
bundle space:    0.01 %
rendered size:   217 Bytes
original size:   398 Bytes
code reduction:  45.48 %
dependents:      1
  - /node_modules/@mui/base/MenuItemUnstyled/MenuItemUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/domain/wallet/wallet.constants.ts
bundle space:    0.01 %
rendered size:   215 Bytes
original size:   331 Bytes
code reduction:  35.05 %
dependents:      3
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/domain/wallet/wallet.utils.ts
  - /src/components/shared/Select/WalletAddressSelector/WalletAddressSelector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/ButtonUnstyled/buttonUnstyledClasses.js
bundle space:    0.01 %
rendered size:   215 Bytes
original size:   392 Bytes
code reduction:  45.15 %
dependents:      1
  - /node_modules/@mui/base/ButtonUnstyled/ButtonUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/OptionGroupUnstyled/optionGroupUnstyledClasses.js
bundle space:    0.01 %
rendered size:   215 Bytes
original size:   402 Bytes
code reduction:  46.52 %
dependents:      1
  - /node_modules/@mui/base/OptionGroupUnstyled/OptionGroupUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Table/Tablelvl2Context.js
bundle space:    0.01 %
rendered size:   214 Bytes
original size:   269 Bytes
code reduction:  20.45 %
dependents:      5
  - /node_modules/@mui/material/TableBody/TableBody.js
  - /node_modules/@mui/material/TableCell/TableCell.js
  - /node_modules/@mui/material/TableFooter/TableFooter.js
  - /node_modules/@mui/material/TableHead/TableHead.js
  - /node_modules/@mui/material/TableRow/TableRow.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
bundle space:    0.01 %
rendered size:   214 Bytes
original size:   229 Bytes
code reduction:  6.55 %
dependents:      1
  - /node_modules/@babel/runtime/helpers/esm/inheritsLoose.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
bundle space:    0.01 %
rendered size:   214 Bytes
original size:   258 Bytes
code reduction:  17.05 %
dependents:      3
  - /node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
  - /node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
  - /node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/ReportProblemOutlined.js
bundle space:    0.01 %
rendered size:   213 Bytes
original size:   353 Bytes
code reduction:  39.66 %
dependents:      1
  - /node_modules/@mui/material/Alert/Alert.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Step/stepClasses.js
bundle space:    0.01 %
rendered size:   212 Bytes
original size:   319 Bytes
code reduction:  33.54 %
dependents:      1
  - /node_modules/@mui/material/Step/Step.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/AvatarGroup/avatarGroupClasses.js
bundle space:    0.01 %
rendered size:   211 Bytes
original size:   305 Bytes
code reduction:  30.82 %
dependents:      1
  - /node_modules/@mui/material/AvatarGroup/AvatarGroup.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ImageList/imageListClasses.js
bundle space:    0.01 %
rendered size:   211 Bytes
original size:   328 Bytes
code reduction:  35.67 %
dependents:      1
  - /node_modules/@mui/material/ImageList/ImageList.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/TabsListUnstyled/tabsListUnstyledClasses.js
bundle space:    0.01 %
rendered size:   209 Bytes
original size:   390 Bytes
code reduction:  46.41 %
dependents:      1
  - /node_modules/@mui/base/TabsListUnstyled/TabsListUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Stepper/stepperClasses.js
bundle space:    0.01 %
rendered size:   208 Bytes
original size:   321 Bytes
code reduction:  35.2 %
dependents:      1
  - /node_modules/@mui/material/Stepper/Stepper.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/Person.js
bundle space:    0.01 %
rendered size:   208 Bytes
original size:   367 Bytes
code reduction:  43.32 %
dependents:      1
  - /node_modules/@mui/material/Avatar/Avatar.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/SnackbarContent/snackbarContentClasses.js
bundle space:    0.01 %
rendered size:   207 Bytes
original size:   336 Bytes
code reduction:  38.39 %
dependents:      1
  - /node_modules/@mui/material/SnackbarContent/SnackbarContent.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ListItemAvatar/listItemAvatarClasses.js
bundle space:    0.01 %
rendered size:   206 Bytes
original size:   333 Bytes
code reduction:  38.14 %
dependents:      1
  - /node_modules/@mui/material/ListItemAvatar/ListItemAvatar.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
bundle space:    0.01 %
rendered size:   205 Bytes
original size:   259 Bytes
code reduction:  20.85 %
dependents:      5
  - /node_modules/react-transition-group/esm/CSSTransition.js
  - /node_modules/react-transition-group/esm/ReplaceTransition.js
  - /node_modules/react-transition-group/esm/SwitchTransition.js
  - /node_modules/react-transition-group/esm/TransitionGroup.js
  - /node_modules/react-transition-group/esm/Transition.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Hidden/hiddenCssClasses.js
bundle space:    0.01 %
rendered size:   204 Bytes
original size:   433 Bytes
code reduction:  52.89 %
dependents:      1
  - /node_modules/@mui/material/Hidden/HiddenCss.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/Close.js
bundle space:    0.01 %
rendered size:   202 Bytes
original size:   382 Bytes
code reduction:  47.12 %
dependents:      2
  - /node_modules/@mui/material/Alert/Alert.js
  - /node_modules/@mui/material/Autocomplete/Autocomplete.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Table/TableContext.js
bundle space:    0.01 %
rendered size:   202 Bytes
original size:   253 Bytes
code reduction:  20.16 %
dependents:      2
  - /node_modules/@mui/material/Table/Table.js
  - /node_modules/@mui/material/TableCell/TableCell.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/DialogTitle/dialogTitleClasses.js
bundle space:    0.01 %
rendered size:   201 Bytes
original size:   295 Bytes
code reduction:  31.86 %
dependents:      2
  - /node_modules/@mui/material/DialogContent/DialogContent.js
  - /node_modules/@mui/material/DialogTitle/DialogTitle.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/List/ListContext.js
bundle space:    0.01 %
rendered size:   201 Bytes
original size:   251 Bytes
code reduction:  19.92 %
dependents:      8
  - /node_modules/@mui/material/List/List.js
  - /node_modules/@mui/material/ListItem/ListItem.js
  - /node_modules/@mui/material/ListItemAvatar/ListItemAvatar.js
  - /node_modules/@mui/material/ListItemButton/ListItemButton.js
  - /node_modules/@mui/material/ListItemIcon/ListItemIcon.js
  - /node_modules/@mui/material/ListItemSecondaryAction/ListItemSecondaryAction.js
  - /node_modules/@mui/material/ListItemText/ListItemText.js
  - /node_modules/@mui/material/MenuItem/MenuItem.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/AccordionActions/accordionActionsClasses.js
bundle space:    0.01 %
rendered size:   200 Bytes
original size:   331 Bytes
code reduction:  39.58 %
dependents:      1
  - /node_modules/@mui/material/AccordionActions/AccordionActions.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/MenuUnstyled/menuUnstyledClasses.js
bundle space:    0.01 %
rendered size:   200 Bytes
original size:   373 Bytes
code reduction:  46.38 %
dependents:      1
  - /node_modules/@mui/base/MenuUnstyled/MenuUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js
bundle space:    0.01 %
rendered size:   200 Bytes
original size:   264 Bytes
code reduction:  24.24 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Grid/GridContext.js
bundle space:    0.01 %
rendered size:   199 Bytes
original size:   249 Bytes
code reduction:  20.08 %
dependents:      1
  - /node_modules/@mui/material/Grid/Grid.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Pagination/paginationClasses.js
bundle space:    0.01 %
rendered size:   197 Bytes
original size:   316 Bytes
code reduction:  37.66 %
dependents:      1
  - /node_modules/@mui/material/Pagination/Pagination.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/TabsUnstyled/tabsUnstyledClasses.js
bundle space:    0.01 %
rendered size:   197 Bytes
original size:   370 Bytes
code reduction:  46.76 %
dependents:      1
  - /node_modules/@mui/base/TabsUnstyled/TabsUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/StepContent/stepContentClasses.js
bundle space:    0.01 %
rendered size:   196 Bytes
original size:   317 Bytes
code reduction:  38.17 %
dependents:      1
  - /node_modules/@mui/material/StepContent/StepContent.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/CheckCircle.js
bundle space:    0.01 %
rendered size:   195 Bytes
original size:   349 Bytes
code reduction:  44.13 %
dependents:      1
  - /node_modules/@mui/material/StepIcon/StepIcon.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/visuallyHidden.js
bundle space:    0.01 %
rendered size:   195 Bytes
original size:   226 Bytes
code reduction:  13.72 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
bundle space:    0.01 %
rendered size:   194 Bytes
original size:   209 Bytes
code reduction:  7.18 %
dependents:      1
  - /node_modules/@popperjs/core/lib/modifiers/flip.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Toolbar/toolbarClasses.js
bundle space:    0.01 %
rendered size:   193 Bytes
original size:   306 Bytes
code reduction:  36.93 %
dependents:      1
  - /node_modules/@mui/material/Toolbar/Toolbar.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/TabPanelUnstyled/tabPanelUnstyledClasses.js
bundle space:    0.01 %
rendered size:   193 Bytes
original size:   374 Bytes
code reduction:  48.4 %
dependents:      1
  - /node_modules/@mui/base/TabPanelUnstyled/TabPanelUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/DialogContent/dialogContentClasses.js
bundle space:    0.01 %
rendered size:   192 Bytes
original size:   317 Bytes
code reduction:  39.43 %
dependents:      1
  - /node_modules/@mui/material/DialogContent/DialogContent.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/DialogContentText/dialogContentTextClasses.js
bundle space:    0.01 %
rendered size:   192 Bytes
original size:   325 Bytes
code reduction:  40.92 %
dependents:      1
  - /node_modules/@mui/material/DialogContentText/DialogContentText.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ScopedCssBaseline/scopedCssBaselineClasses.js
bundle space:    0.01 %
rendered size:   192 Bytes
original size:   325 Bytes
code reduction:  40.92 %
dependents:      1
  - /node_modules/@mui/material/ScopedCssBaseline/ScopedCssBaseline.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/TabUnstyled/tabUnstyledClasses.js
bundle space:    0.01 %
rendered size:   192 Bytes
original size:   363 Bytes
code reduction:  47.11 %
dependents:      1
  - /node_modules/@mui/base/TabUnstyled/TabUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/DialogActions/dialogActionsClasses.js
bundle space:    0.01 %
rendered size:   191 Bytes
original size:   316 Bytes
code reduction:  39.56 %
dependents:      1
  - /node_modules/@mui/material/DialogActions/DialogActions.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/within.js
bundle space:    0.01 %
rendered size:   190 Bytes
original size:   262 Bytes
code reduction:  27.48 %
dependents:      2
  - /node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
  - /node_modules/@popperjs/core/lib/modifiers/arrow.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/AccordionDetails/accordionDetailsClasses.js
bundle space:    0.01 %
rendered size:   189 Bytes
original size:   320 Bytes
code reduction:  40.94 %
dependents:      1
  - /node_modules/@mui/material/AccordionDetails/AccordionDetails.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/BottomNavigation/bottomNavigationClasses.js
bundle space:    0.01 %
rendered size:   189 Bytes
original size:   320 Bytes
code reduction:  40.94 %
dependents:      1
  - /node_modules/@mui/material/BottomNavigation/BottomNavigation.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/utils/areArraysEqual.js
bundle space:    0.01 %
rendered size:   189 Bytes
original size:   204 Bytes
code reduction:  7.35 %
dependents:      2
  - /node_modules/@mui/base/ListboxUnstyled/useListbox.js
  - /node_modules/@mui/base/ListboxUnstyled/useControllableReducer.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/BadgeUnstyled/badgeUnstyledClasses.js
bundle space:    0.01 %
rendered size:   188 Bytes
original size:   363 Bytes
code reduction:  48.21 %
dependents:      1
  - /node_modules/@mui/base/BadgeUnstyled/BadgeUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/NoTransition/NoTransition.tsx
bundle space:    0.01 %
rendered size:   187 Bytes
original size:   263 Bytes
code reduction:  28.9 %
dependents:      1
  - /src/components/shared/FullScreenOverlay/FullScreenOverlay.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/List/listClasses.js
bundle space:    0.01 %
rendered size:   186 Bytes
original size:   293 Bytes
code reduction:  36.52 %
dependents:      1
  - /node_modules/@mui/material/List/List.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/CardActions/cardActionsClasses.js
bundle space:    0.01 %
rendered size:   185 Bytes
original size:   306 Bytes
code reduction:  39.54 %
dependents:      1
  - /node_modules/@mui/material/CardActions/CardActions.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/stylis/src/Enum.js
bundle space:    0.01 %
rendered size:   185 Bytes
original size:   595 Bytes
code reduction:  68.91 %
dependents:      4
  - /node_modules/stylis/src/Parser.js
  - /node_modules/stylis/src/Prefixer.js
  - /node_modules/stylis/src/Serializer.js
  - /node_modules/stylis/src/Middleware.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/CardMedia/cardMediaClasses.js
bundle space:    0.01 %
rendered size:   184 Bytes
original size:   301 Bytes
code reduction:  38.87 %
dependents:      1
  - /node_modules/@mui/material/CardMedia/CardMedia.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/FormGroup/formGroupClasses.js
bundle space:    0.01 %
rendered size:   184 Bytes
original size:   301 Bytes
code reduction:  38.87 %
dependents:      1
  - /node_modules/@mui/material/FormGroup/FormGroup.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TableContainer/tableContainerClasses.js
bundle space:    0.01 %
rendered size:   183 Bytes
original size:   310 Bytes
code reduction:  40.97 %
dependents:      1
  - /node_modules/@mui/material/TableContainer/TableContainer.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/Star.js
bundle space:    0.01 %
rendered size:   183 Bytes
original size:   344 Bytes
code reduction:  46.8 %
dependents:      1
  - /node_modules/@mui/material/Rating/Rating.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/ArrowDownward.js
bundle space:    0.01 %
rendered size:   179 Bytes
original size:   327 Bytes
code reduction:  45.26 %
dependents:      1
  - /node_modules/@mui/material/TableSortLabel/TableSortLabel.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Backdrop/backdropClasses.js
bundle space:    0.01 %
rendered size:   178 Bytes
original size:   293 Bytes
code reduction:  39.25 %
dependents:      1
  - /node_modules/@mui/material/Backdrop/Backdrop.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/observables/Observable.js
bundle space:    0.01 %
rendered size:   178 Bytes
original size:   308 Bytes
code reduction:  42.21 %
dependents:      3
  - /node_modules/@apollo/client/utilities/observables/asyncMap.js
  - /node_modules/@apollo/client/utilities/observables/Concast.js
  - /node_modules/@apollo/client/utilities/observables/subclassing.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
bundle space:    0.01 %
rendered size:   177 Bytes
original size:   192 Bytes
code reduction:  7.81 %
dependents:      1
  - /node_modules/react-transition-group/esm/TransitionGroup.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/rectToClientRect.js
bundle space:    0.01 %
rendered size:   176 Bytes
original size:   191 Bytes
code reduction:  7.85 %
dependents:      2
  - /node_modules/@popperjs/core/lib/utils/detectOverflow.js
  - /node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/merge.js
bundle space:    0.01 %
rendered size:   175 Bytes
original size:   228 Bytes
code reduction:  23.25 %
dependents:      4
  - /node_modules/@mui/system/esm/breakpoints.js
  - /node_modules/@mui/system/esm/compose.js
  - /node_modules/@mui/system/esm/spacing.js
  - /node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/ButtonBase/touchRippleClasses.js
bundle space:    0.01 %
rendered size:   174 Bytes
original size:   380 Bytes
code reduction:  54.21 %
dependents:      1
  - /node_modules/@mui/material/ButtonBase/TouchRipple.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/CardContent/cardContentClasses.js
bundle space:    0.01 %
rendered size:   174 Bytes
original size:   295 Bytes
code reduction:  41.02 %
dependents:      1
  - /node_modules/@mui/material/CardContent/CardContent.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TableFooter/tableFooterClasses.js
bundle space:    0.01 %
rendered size:   174 Bytes
original size:   295 Bytes
code reduction:  41.02 %
dependents:      1
  - /node_modules/@mui/material/TableFooter/TableFooter.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/config/theme/themeUtils.ts
bundle space:    0.01 %
rendered size:   172 Bytes
original size:   198 Bytes
code reduction:  13.13 %
dependents:      1
  - /src/config/theme/themeComponents.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Table/tableClasses.js
bundle space:    0.01 %
rendered size:   172 Bytes
original size:   281 Bytes
code reduction:  38.79 %
dependents:      1
  - /node_modules/@mui/material/Table/Table.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/AlertTitle/alertTitleClasses.js
bundle space:    0.01 %
rendered size:   171 Bytes
original size:   290 Bytes
code reduction:  41.03 %
dependents:      1
  - /node_modules/@mui/material/AlertTitle/AlertTitle.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Popover/popoverClasses.js
bundle space:    0.01 %
rendered size:   171 Bytes
original size:   284 Bytes
code reduction:  39.79 %
dependents:      1
  - /node_modules/@mui/material/Popover/Popover.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/KeyboardArrowLeft.js
bundle space:    0.01 %
rendered size:   171 Bytes
original size:   319 Bytes
code reduction:  46.39 %
dependents:      2
  - /node_modules/@mui/material/TabScrollButton/TabScrollButton.js
  - /node_modules/@mui/material/TablePagination/TablePaginationActions.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/KeyboardArrowRight.js
bundle space:    0.01 %
rendered size:   171 Bytes
original size:   318 Bytes
code reduction:  46.23 %
dependents:      2
  - /node_modules/@mui/material/TabScrollButton/TabScrollButton.js
  - /node_modules/@mui/material/TablePagination/TablePaginationActions.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/usePreviousProps.js
bundle space:    0.01 %
rendered size:   171 Bytes
original size:   216 Bytes
code reduction:  20.83 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Menu/menuClasses.js
bundle space:    0.01 %
rendered size:   170 Bytes
original size:   277 Bytes
code reduction:  38.63 %
dependents:      1
  - /node_modules/@mui/material/Menu/Menu.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
bundle space:    0.01 %
rendered size:   169 Bytes
original size:   195 Bytes
code reduction:  13.33 %
dependents:      2
  - /node_modules/@emotion/cache/dist/emotion-cache.esm.js
  - /node_modules/@emotion/serialize/dist/emotion-serialize.esm.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TableBody/tableBodyClasses.js
bundle space:    0.01 %
rendered size:   168 Bytes
original size:   285 Bytes
code reduction:  41.05 %
dependents:      1
  - /node_modules/@mui/material/TableBody/TableBody.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TableHead/tableHeadClasses.js
bundle space:    0.01 %
rendered size:   168 Bytes
original size:   285 Bytes
code reduction:  41.05 %
dependents:      1
  - /node_modules/@mui/material/TableHead/TableHead.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/TextField/textFieldClasses.js
bundle space:    0.01 %
rendered size:   168 Bytes
original size:   285 Bytes
code reduction:  41.05 %
dependents:      1
  - /node_modules/@mui/material/TextField/TextField.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/useTheme.js
bundle space:    0.01 %
rendered size:   168 Bytes
original size:   283 Bytes
code reduction:  40.64 %
dependents:      3
  - /node_modules/@mui/system/esm/createBox.js
  - /node_modules/@mui/system/esm/useThemeProps/useThemeProps.js
  - /node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/utils/isHostComponent.js
bundle space:    0.01 %
rendered size:   168 Bytes
original size:   201 Bytes
code reduction:  16.42 %
dependents:      4
  - /node_modules/@mui/base/ModalUnstyled/ModalUnstyled.js
  - /node_modules/@mui/base/SliderUnstyled/SliderUnstyled.js
  - /node_modules/@mui/base/utils/appendOwnerState.js
  - /node_modules/@mui/base/InputUnstyled/InputUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/FirstPage.js
bundle space:    0.01 %
rendered size:   167 Bytes
original size:   319 Bytes
code reduction:  47.65 %
dependents:      2
  - /node_modules/@mui/material/PaginationItem/PaginationItem.js
  - /node_modules/@mui/material/TablePagination/TablePaginationActions.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/ModalUnstyled/modalUnstyledClasses.js
bundle space:    0.01 %
rendered size:   166 Bytes
original size:   341 Bytes
code reduction:  51.32 %
dependents:      1
  - /node_modules/@mui/base/ModalUnstyled/ModalUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/LastPage.js
bundle space:    0 %
rendered size:   165 Bytes
original size:   318 Bytes
code reduction:  48.11 %
dependents:      2
  - /node_modules/@mui/material/PaginationItem/PaginationItem.js
  - /node_modules/@mui/material/TablePagination/TablePaginationActions.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/SwitchUnstyled/switchUnstyledClasses.js
bundle space:    0 %
rendered size:   165 Bytes
original size:   422 Bytes
code reduction:  60.9 %
dependents:      1
  - /node_modules/@mui/base/SwitchUnstyled/SwitchUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/merge-options/index.mjs
bundle space:    0 %
rendered size:   164 Bytes
original size:   234 Bytes
code reduction:  29.91 %
dependents:      2
  - /src/config/theme/themeTypography.ts
  - /src/config/theme/themePalette.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/NavigateBefore.js
bundle space:    0 %
rendered size:   164 Bytes
original size:   311 Bytes
code reduction:  47.27 %
dependents:      1
  - /node_modules/@mui/material/PaginationItem/PaginationItem.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/private-theming/useTheme/ThemeContext.js
bundle space:    0 %
rendered size:   164 Bytes
original size:   215 Bytes
code reduction:  23.72 %
dependents:      2
  - /node_modules/@mui/private-theming/ThemeProvider/ThemeProvider.js
  - /node_modules/@mui/private-theming/useTheme/useTheme.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/NavigateNext.js
bundle space:    0 %
rendered size:   161 Bytes
original size:   310 Bytes
code reduction:  48.06 %
dependents:      1
  - /node_modules/@mui/material/PaginationItem/PaginationItem.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/memoize.js
bundle space:    0 %
rendered size:   161 Bytes
original size:   176 Bytes
code reduction:  8.52 %
dependents:      1
  - /node_modules/@mui/system/esm/spacing.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Container/containerClasses.js
bundle space:    0 %
rendered size:   157 Bytes
original size:   382 Bytes
code reduction:  58.9 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/isMuiElement.js
bundle space:    0 %
rendered size:   157 Bytes
original size:   193 Bytes
code reduction:  18.65 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/Container/containerClasses.js
bundle space:    0 %
rendered size:   157 Bytes
original size:   451 Bytes
code reduction:  65.19 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.constants.ts
bundle space:    0 %
rendered size:   155 Bytes
original size:   254 Bytes
code reduction:  38.98 %
dependents:      1
  - /src/components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/styles/useThemeProps.js
bundle space:    0 %
rendered size:   154 Bytes
original size:   248 Bytes
code reduction:  37.9 %
dependents:      114
  - /node_modules/@mui/material/Accordion/Accordion.js
  - /node_modules/@mui/material/AccordionActions/AccordionActions.js
  - /node_modules/@mui/material/AccordionDetails/AccordionDetails.js
  - /node_modules/@mui/material/AccordionSummary/AccordionSummary.js
  - /node_modules/@mui/material/Alert/Alert.js
  - /node_modules/@mui/material/AlertTitle/AlertTitle.js
  - /node_modules/@mui/material/AppBar/AppBar.js
  - /node_modules/@mui/material/Autocomplete/Autocomplete.js
  - /node_modules/@mui/material/Avatar/Avatar.js
  - /node_modules/@mui/material/AvatarGroup/AvatarGroup.js
  - /node_modules/@mui/material/Backdrop/Backdrop.js
  - /node_modules/@mui/material/Badge/Badge.js
  - /node_modules/@mui/material/BottomNavigation/BottomNavigation.js
  - /node_modules/@mui/material/BottomNavigationAction/BottomNavigationAction.js
  - /node_modules/@mui/material/Breadcrumbs/Breadcrumbs.js
  - /node_modules/@mui/material/Button/Button.js
  - /node_modules/@mui/material/ButtonBase/ButtonBase.js
  - /node_modules/@mui/material/ButtonGroup/ButtonGroup.js
  - /node_modules/@mui/material/Card/Card.js
  - /node_modules/@mui/material/CardActionArea/CardActionArea.js
  - /node_modules/@mui/material/CardActions/CardActions.js
  - /node_modules/@mui/material/CardContent/CardContent.js
  - /node_modules/@mui/material/CardHeader/CardHeader.js
  - /node_modules/@mui/material/CardMedia/CardMedia.js
  - /node_modules/@mui/material/Checkbox/Checkbox.js
  - /node_modules/@mui/material/Chip/Chip.js
  - /node_modules/@mui/material/CircularProgress/CircularProgress.js
  - /node_modules/@mui/material/Collapse/Collapse.js
  - /node_modules/@mui/material/Container/Container.js
  - /node_modules/@mui/material/CssBaseline/CssBaseline.js
  - /node_modules/@mui/material/Dialog/Dialog.js
  - /node_modules/@mui/material/DialogActions/DialogActions.js
  - /node_modules/@mui/material/DialogContent/DialogContent.js
  - /node_modules/@mui/material/DialogContentText/DialogContentText.js
  - /node_modules/@mui/material/DialogTitle/DialogTitle.js
  - /node_modules/@mui/material/Divider/Divider.js
  - /node_modules/@mui/material/Drawer/Drawer.js
  - /node_modules/@mui/material/Fab/Fab.js
  - /node_modules/@mui/material/FilledInput/FilledInput.js
  - /node_modules/@mui/material/FormControl/FormControl.js
  - /node_modules/@mui/material/FormControlLabel/FormControlLabel.js
  - /node_modules/@mui/material/FormGroup/FormGroup.js
  - /node_modules/@mui/material/FormHelperText/FormHelperText.js
  - /node_modules/@mui/material/FormLabel/FormLabel.js
  - /node_modules/@mui/material/Grid/Grid.js
  - /node_modules/@mui/material/Icon/Icon.js
  - /node_modules/@mui/material/IconButton/IconButton.js
  - /node_modules/@mui/material/ImageList/ImageList.js
  - /node_modules/@mui/material/ImageListItem/ImageListItem.js
  - /node_modules/@mui/material/ImageListItemBar/ImageListItemBar.js
  - /node_modules/@mui/material/Input/Input.js
  - /node_modules/@mui/material/InputAdornment/InputAdornment.js
  - /node_modules/@mui/material/InputBase/InputBase.js
  - /node_modules/@mui/material/InputLabel/InputLabel.js
  - /node_modules/@mui/material/LinearProgress/LinearProgress.js
  - /node_modules/@mui/material/Link/Link.js
  - /node_modules/@mui/material/List/List.js
  - /node_modules/@mui/material/ListItem/ListItem.js
  - /node_modules/@mui/material/ListItemAvatar/ListItemAvatar.js
  - /node_modules/@mui/material/ListItemButton/ListItemButton.js
  - /node_modules/@mui/material/ListItemIcon/ListItemIcon.js
  - /node_modules/@mui/material/ListItemSecondaryAction/ListItemSecondaryAction.js
  - /node_modules/@mui/material/ListItemText/ListItemText.js
  - /node_modules/@mui/material/ListSubheader/ListSubheader.js
  - /node_modules/@mui/material/Menu/Menu.js
  - /node_modules/@mui/material/MenuItem/MenuItem.js
  - /node_modules/@mui/material/MobileStepper/MobileStepper.js
  - /node_modules/@mui/material/Modal/Modal.js
  - /node_modules/@mui/material/NativeSelect/NativeSelect.js
  - /node_modules/@mui/material/OutlinedInput/OutlinedInput.js
  - /node_modules/@mui/material/Pagination/Pagination.js
  - /node_modules/@mui/material/PaginationItem/PaginationItem.js
  - /node_modules/@mui/material/Paper/Paper.js
  - /node_modules/@mui/material/Popover/Popover.js
  - /node_modules/@mui/material/Radio/Radio.js
  - /node_modules/@mui/material/Rating/Rating.js
  - /node_modules/@mui/material/ScopedCssBaseline/ScopedCssBaseline.js
  - /node_modules/@mui/material/Select/Select.js
  - /node_modules/@mui/material/Skeleton/Skeleton.js
  - /node_modules/@mui/material/Slider/Slider.js
  - /node_modules/@mui/material/Snackbar/Snackbar.js
  - /node_modules/@mui/material/SnackbarContent/SnackbarContent.js
  - /node_modules/@mui/material/SpeedDial/SpeedDial.js
  - /node_modules/@mui/material/SpeedDialAction/SpeedDialAction.js
  - /node_modules/@mui/material/SpeedDialIcon/SpeedDialIcon.js
  - /node_modules/@mui/material/Stack/Stack.js
  - /node_modules/@mui/material/Step/Step.js
  - /node_modules/@mui/material/StepButton/StepButton.js
  - /node_modules/@mui/material/StepConnector/StepConnector.js
  - /node_modules/@mui/material/StepContent/StepContent.js
  - /node_modules/@mui/material/StepIcon/StepIcon.js
  - /node_modules/@mui/material/StepLabel/StepLabel.js
  - /node_modules/@mui/material/Stepper/Stepper.js
  - /node_modules/@mui/material/SvgIcon/SvgIcon.js
  - /node_modules/@mui/material/Switch/Switch.js
  - /node_modules/@mui/material/Tab/Tab.js
  - /node_modules/@mui/material/Table/Table.js
  - /node_modules/@mui/material/TableBody/TableBody.js
  - /node_modules/@mui/material/TableCell/TableCell.js
  - /node_modules/@mui/material/TableContainer/TableContainer.js
  - /node_modules/@mui/material/TableFooter/TableFooter.js
  - /node_modules/@mui/material/TableHead/TableHead.js
  - /node_modules/@mui/material/TablePagination/TablePagination.js
  - /node_modules/@mui/material/TableRow/TableRow.js
  - /node_modules/@mui/material/TableSortLabel/TableSortLabel.js
  - /node_modules/@mui/material/Tabs/Tabs.js
  - /node_modules/@mui/material/TabScrollButton/TabScrollButton.js
  - /node_modules/@mui/material/TextField/TextField.js
  - /node_modules/@mui/material/ToggleButton/ToggleButton.js
  - /node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js
  - /node_modules/@mui/material/Toolbar/Toolbar.js
  - /node_modules/@mui/material/Tooltip/Tooltip.js
  - /node_modules/@mui/material/Typography/Typography.js
  - /node_modules/@mui/material/ButtonBase/TouchRipple.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Dialog/DialogContext.js
bundle space:    0 %
rendered size:   154 Bytes
original size:   218 Bytes
code reduction:  29.36 %
dependents:      2
  - /node_modules/@mui/material/Dialog/Dialog.js
  - /node_modules/@mui/material/DialogTitle/DialogTitle.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/Card/cardClasses.js
bundle space:    0 %
rendered size:   153 Bytes
original size:   260 Bytes
code reduction:  41.15 %
dependents:      1
  - /node_modules/@mui/material/Card/Card.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/FormControlUnstyled/formControlUnstyledClasses.js
bundle space:    0 %
rendered size:   152 Bytes
original size:   427 Bytes
code reduction:  64.4 %
dependents:      1
  - /node_modules/@mui/base/FormControlUnstyled/FormControlUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/Warning.js
bundle space:    0 %
rendered size:   151 Bytes
original size:   309 Bytes
code reduction:  51.13 %
dependents:      1
  - /node_modules/@mui/material/StepIcon/StepIcon.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/jsutils/devAssert.mjs
bundle space:    0 %
rendered size:   151 Bytes
original size:   159 Bytes
code reduction:  5.03 %
dependents:      6
  - /node_modules/graphql/type/definition.mjs
  - /node_modules/graphql/type/directives.mjs
  - /node_modules/graphql/type/assertName.mjs
  - /node_modules/graphql/language/source.mjs
  - /node_modules/graphql/language/visitor.mjs
  - /node_modules/graphql/utilities/extendSchema.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mdi/js/mdi.js
bundle space:    0 %
rendered size:   150 Bytes
original size:   2.541 MB
code reduction:  99.99 %
dependents:      1
  - /src/components/shared/PaymentMethodSelector/PaymentMethodSelector.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/components/shared/OutlinedSecondaryButton/OutlinedSecondaryButton.tsx
bundle space:    0 %
rendered size:   149 Bytes
original size:   202 Bytes
code reduction:  26.24 %
dependents:      1
  - /src/components/payments/CheckoutModalHeader/CheckoutModalHeader.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/expandToHashMap.js
bundle space:    0 %
rendered size:   144 Bytes
original size:   159 Bytes
code reduction:  9.43 %
dependents:      2
  - /node_modules/@popperjs/core/lib/modifiers/arrow.js
  - /node_modules/@popperjs/core/lib/utils/detectOverflow.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/utils/fromError.js
bundle space:    0 %
rendered size:   135 Bytes
original size:   226 Bytes
code reduction:  40.27 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/MenuUnstyled/MenuUnstyledContext.js
bundle space:    0 %
rendered size:   135 Bytes
original size:   192 Bytes
code reduction:  29.69 %
dependents:      1
  - /node_modules/@mui/base/MenuUnstyled/MenuUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/private-theming/ThemeProvider/nested.js
bundle space:    0 %
rendered size:   133 Bytes
original size:   135 Bytes
code reduction:  1.48 %
dependents:      1
  - /node_modules/@mui/private-theming/ThemeProvider/ThemeProvider.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/Add.js
bundle space:    0 %
rendered size:   132 Bytes
original size:   280 Bytes
code reduction:  52.86 %
dependents:      1
  - /node_modules/@mui/material/SpeedDialIcon/SpeedDialIcon.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/refType.js
bundle space:    0 %
rendered size:   132 Bytes
original size:   132 Bytes
code reduction:  0 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/internal/svg-icons/ArrowDropDown.js
bundle space:    0 %
rendered size:   131 Bytes
original size:   279 Bytes
code reduction:  53.05 %
dependents:      3
  - /node_modules/@mui/material/Autocomplete/Autocomplete.js
  - /node_modules/@mui/material/NativeSelect/NativeSelect.js
  - /node_modules/@mui/material/Select/Select.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
bundle space:    0 %
rendered size:   127 Bytes
original size:   142 Bytes
code reduction:  10.56 %
dependents:      1
  - /node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/domain/payment/payment.constants.ts
bundle space:    0 %
rendered size:   123 Bytes
original size:   143 Bytes
code reduction:  13.99 %
dependents:      2
  - /src/components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.utils.ts
  - /src/components/payments/PaymentDetailsItem/Fragment/PaymentDetailsFragment.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
bundle space:    0 %
rendered size:   122 Bytes
original size:   184 Bytes
code reduction:  33.7 %
dependents:      2
  - /node_modules/@popperjs/core/lib/modifiers/arrow.js
  - /node_modules/@popperjs/core/lib/utils/detectOverflow.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/FormControlUnstyled/useFormControlUnstyledContext.js
bundle space:    0 %
rendered size:   121 Bytes
original size:   217 Bytes
code reduction:  44.24 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/useEnhancedEffect.js
bundle space:    0 %
rendered size:   120 Bytes
original size:   164 Bytes
code reduction:  26.83 %
dependents:      1
  - /node_modules/@mui/utils/esm/useEventCallback.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/globals/fix-graphql.js
bundle space:    0 %
rendered size:   119 Bytes
original size:   237 Bytes
code reduction:  49.79 %
dependents:      1
  - /node_modules/@apollo/client/utilities/globals/index.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/utilities/extendSchema.mjs
bundle space:    0 %
rendered size:   114 Bytes
original size:   23.975 KB
code reduction:  99.52 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
bundle space:    0 %
rendered size:   114 Bytes
original size:   162 Bytes
code reduction:  29.63 %
dependents:      1
  - /node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/ownerWindow.js
bundle space:    0 %
rendered size:   112 Bytes
original size:   161 Bytes
code reduction:  30.43 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
bundle space:    0 %
rendered size:   112 Bytes
original size:   127 Bytes
code reduction:  11.81 %
dependents:      3
  - /node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
  - /node_modules/@popperjs/core/lib/modifiers/arrow.js
  - /node_modules/@popperjs/core/lib/utils/computeOffsets.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/common/errorHandling.js
bundle space:    0 %
rendered size:   107 Bytes
original size:   156 Bytes
code reduction:  31.41 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
bundle space:    0 %
rendered size:   104 Bytes
original size:   148 Bytes
code reduction:  29.73 %
dependents:      6
  - /node_modules/@popperjs/core/lib/createPopper.js
  - /node_modules/@popperjs/core/lib/modifiers/computeStyles.js
  - /node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
  - /node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
  - /node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
  - /node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
bundle space:    0 %
rendered size:   102 Bytes
original size:   117 Bytes
code reduction:  12.82 %
dependents:      2
  - /node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
  - /node_modules/@popperjs/core/lib/utils/mergePaddingObject.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/shouldSpreadAdditionalProps.js
bundle space:    0 %
rendered size:   101 Bytes
original size:   181 Bytes
code reduction:  44.2 %
dependents:      2
  - /node_modules/@mui/material/Badge/Badge.js
  - /node_modules/@mui/material/Slider/Slider.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
bundle space:    0 %
rendered size:   99 Bytes
original size:   114 Bytes
code reduction:  13.16 %
dependents:      7
  - /node_modules/@popperjs/core/lib/modifiers/applyStyles.js
  - /node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
  - /node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
  - /node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
  - /node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
  - /node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
  - /node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/FormControl/useFormControl.js
bundle space:    0 %
rendered size:   98 Bytes
original size:   178 Bytes
code reduction:  44.94 %
dependents:      10
  - /node_modules/@mui/material/FormGroup/FormGroup.js
  - /node_modules/@mui/material/FormHelperText/FormHelperText.js
  - /node_modules/@mui/material/FormLabel/FormLabel.js
  - /node_modules/@mui/material/InputAdornment/InputAdornment.js
  - /node_modules/@mui/material/InputBase/InputBase.js
  - /node_modules/@mui/material/InputLabel/InputLabel.js
  - /node_modules/@mui/material/NativeSelect/NativeSelect.js
  - /node_modules/@mui/material/OutlinedInput/OutlinedInput.js
  - /node_modules/@mui/material/Select/Select.js
  - /node_modules/@mui/material/internal/SwitchBase.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/RadioGroup/useRadioGroup.js
bundle space:    0 %
rendered size:   96 Bytes
original size:   174 Bytes
code reduction:  44.83 %
dependents:      1
  - /node_modules/@mui/material/Radio/Radio.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/graphql/jsutils/identityFunc.mjs
bundle space:    0 %
rendered size:   91 Bytes
original size:   99 Bytes
code reduction:  8.08 %
dependents:      1
  - /node_modules/graphql/type/definition.mjs

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/common/arrays.js
bundle space:    0 %
rendered size:   88 Bytes
original size:   130 Bytes
code reduction:  32.31 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/common/objects.js
bundle space:    0 %
rendered size:   85 Bytes
original size:   128 Bytes
code reduction:  33.59 %
dependents:      3
  - /node_modules/@apollo/client/utilities/graphql/storeUtils.js
  - /node_modules/@apollo/client/utilities/common/mergeDeep.js
  - /node_modules/@apollo/client/utilities/common/maybeDeepFreeze.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/SelectUnstyled/SelectUnstyledContext.js
bundle space:    0 %
rendered size:   85 Bytes
original size:   113 Bytes
code reduction:  24.78 %
dependents:      3
  - /node_modules/@mui/base/MultiSelectUnstyled/MultiSelectUnstyled.js
  - /node_modules/@mui/base/OptionUnstyled/OptionUnstyled.js
  - /node_modules/@mui/base/SelectUnstyled/SelectUnstyled.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/utilities/globals/maybe.js
bundle space:    0 %
rendered size:   84 Bytes
original size:   125 Bytes
code reduction:  32.8 %
dependents:      3
  - /node_modules/@apollo/client/utilities/globals/index.js
  - /node_modules/@apollo/client/utilities/globals/DEV.js
  - /node_modules/@apollo/client/utilities/globals/global.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/hooks/useDictionary.ts
bundle space:    0 %
rendered size:   83 Bytes
original size:   172 Bytes
code reduction:  51.74 %
dependents:      6
  - /src/views/Confirmation/ConfirmationView.tsx
  - /src/forms/PaymentMethodForm.tsx
  - /src/components/payments/PurchaseConfirmationItemDetails/PurchaseConfirmationItemDetails.tsx
  - /src/components/shared/ConsentText/ConsentText.tsx
  - /src/components/payments/DeliveryWallet/DeliveryWalletSelector/DeliveryWalletSelector.tsx
  - /src/components/payments/DeliveryWallet/DeliveryWalletDetails/DeliveryWalletDetails.tsx

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/shadows.js
bundle space:    0 %
rendered size:   83 Bytes
original size:   127 Bytes
code reduction:  34.65 %
dependents:      1
  - /node_modules/@mui/system/esm/getThemeValue.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/domain/build/build.constants.ts
bundle space:    0 %
rendered size:   81 Bytes
original size:   95 Bytes
code reduction:  14.74 %
dependents:      5
  - /src/index.ts
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.tsx
  - /src/components/public/CheckoutOverlay/CheckoutOverlay.utils.ts
  - /src/domain/url/url.utils.ts
  - /src/utils/storageUtils.ts

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/utils/esm/ownerDocument.js
bundle space:    0 %
rendered size:   81 Bytes
original size:   96 Bytes
code reduction:  15.63 %
dependents:      1
  - /node_modules/@mui/utils/esm/ownerWindow.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/util/toArray.js
bundle space:    0 %
rendered size:   75 Bytes
original size:   90 Bytes
code reduction:  16.67 %
dependents:      2
  - /node_modules/yup/es/ValidationError.js
  - /node_modules/yup/es/schema.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-transition-group/esm/TransitionGroupContext.js
bundle space:    0 %
rendered size:   75 Bytes
original size:   68 Bytes
code reduction:  0 %
dependents:      3
  - /node_modules/react-transition-group/esm/SwitchTransition.js
  - /node_modules/react-transition-group/esm/TransitionGroup.js
  - /node_modules/react-transition-group/esm/Transition.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/getBasePlacement.js
bundle space:    0 %
rendered size:   74 Bytes
original size:   125 Bytes
code reduction:  40.8 %
dependents:      8
  - /node_modules/@popperjs/core/lib/createPopper.js
  - /node_modules/@popperjs/core/lib/modifiers/computeStyles.js
  - /node_modules/@popperjs/core/lib/modifiers/offset.js
  - /node_modules/@popperjs/core/lib/modifiers/flip.js
  - /node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
  - /node_modules/@popperjs/core/lib/modifiers/arrow.js
  - /node_modules/@popperjs/core/lib/utils/computeOffsets.js
  - /node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/getVariation.js
bundle space:    0 %
rendered size:   70 Bytes
original size:   85 Bytes
code reduction:  17.65 %
dependents:      5
  - /node_modules/@popperjs/core/lib/modifiers/computeStyles.js
  - /node_modules/@popperjs/core/lib/modifiers/flip.js
  - /node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
  - /node_modules/@popperjs/core/lib/utils/computeOffsets.js
  - /node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/getAltAxis.js
bundle space:    0 %
rendered size:   64 Bytes
original size:   79 Bytes
code reduction:  18.99 %
dependents:      1
  - /node_modules/@popperjs/core/lib/modifiers/preventOverflow.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@popperjs/core/lib/utils/math.js
bundle space:    0 %
rendered size:   63 Bytes
original size:   84 Bytes
code reduction:  25 %
dependents:      7
  - /node_modules/@popperjs/core/lib/modifiers/computeStyles.js
  - /node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
  - /node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
  - /node_modules/@popperjs/core/lib/utils/within.js
  - /node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
  - /node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
  - /node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/base/SelectUnstyled/useSelect.types.js
bundle space:    0 %
rendered size:   59 Bytes
original size:   66 Bytes
code reduction:  10.61 %
dependents:      1
  - /node_modules/@mui/base/SelectUnstyled/utils.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/core/index.js
bundle space:    0 %
rendered size:   58 Bytes
original size:   1.052 KB
code reduction:  94.49 %
dependents:      2
  - /node_modules/@apollo/client/react/hooks/useMutation.js
  - /node_modules/@apollo/client/react/hooks/useQuery.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/colors/common.js
bundle space:    0 %
rendered size:   52 Bytes
original size:   75 Bytes
code reduction:  30.67 %
dependents:      1
  - /node_modules/@mui/material/styles/createPalette.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/util/isSchema.js
bundle space:    0 %
rendered size:   51 Bytes
original size:   77 Bytes
code reduction:  33.77 %
dependents:      2
  - /node_modules/yup/es/Condition.js
  - /node_modules/yup/es/util/sortFields.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/styles/defaultTheme.js
bundle space:    0 %
rendered size:   46 Bytes
original size:   105 Bytes
code reduction:  56.19 %
dependents:      4
  - /node_modules/@mui/material/styles/useTheme.js
  - /node_modules/@mui/material/styles/useThemeProps.js
  - /node_modules/@mui/material/styles/styled.js
  - /node_modules/@mui/material/GlobalStyles/GlobalStyles.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/core/execute.js
bundle space:    0 %
rendered size:   44 Bytes
original size:   122 Bytes
code reduction:  63.93 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/styled.js
bundle space:    0 %
rendered size:   41 Bytes
original size:   96 Bytes
code reduction:  57.29 %
dependents:      1
  - /node_modules/@mui/system/esm/Container/createContainer.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/yup/es/util/isAbsent.js
bundle space:    0 %
rendered size:   40 Bytes
original size:   66 Bytes
code reduction:  39.39 %
dependents:      3
  - /node_modules/yup/es/boolean.js
  - /node_modules/yup/es/string.js
  - /node_modules/yup/es/date.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/system/esm/createTheme/shape.js
bundle space:    0 %
rendered size:   36 Bytes
original size:   58 Bytes
code reduction:  37.93 %
dependents:      1
  - /node_modules/@mui/system/esm/createTheme/createTheme.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/react-transition-group/esm/config.js
bundle space:    0 %
rendered size:   35 Bytes
original size:   37 Bytes
code reduction:  5.41 %
dependents:      1
  - /node_modules/react-transition-group/esm/Transition.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/core/concat.js
bundle space:    0 %
rendered size:   29 Bytes
original size:   119 Bytes
code reduction:  75.63 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/core/empty.js
bundle space:    0 %
rendered size:   28 Bytes
original size:   116 Bytes
code reduction:  75.86 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/core/split.js
bundle space:    0 %
rendered size:   28 Bytes
original size:   116 Bytes
code reduction:  75.86 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/link/core/from.js
bundle space:    0 %
rendered size:   27 Bytes
original size:   113 Bytes
code reduction:  76.11 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@apollo/client/version.js
bundle space:    0 %
rendered size:   22 Bytes
original size:   65 Bytes
code reduction:  66.15 %
dependents:      1
  - /node_modules/@apollo/client/core/ApolloClient.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:             /node_modules/react-use-country-region/dist/index.js?commonjs-exports
bundle space:    0 %
rendered size:   14 Bytes
original size:   41 Bytes
code reduction:  65.85 %
dependents:      1
  - /node_modules/react-use-country-region/dist/index.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /src/index.ts?commonjs-entry
bundle space:    0 %
rendered size:   0 Byte
original size:   74 Bytes
code reduction:  100 %
dependents:      0

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/capitalize.js
bundle space:    0 %
rendered size:   0 Byte
original size:   90 Bytes
code reduction:  100 %
dependents:      47
  - /node_modules/@mui/material/Alert/Alert.js
  - /node_modules/@mui/material/AppBar/AppBar.js
  - /node_modules/@mui/material/Autocomplete/Autocomplete.js
  - /node_modules/@mui/material/Badge/Badge.js
  - /node_modules/@mui/material/Button/Button.js
  - /node_modules/@mui/material/ButtonGroup/ButtonGroup.js
  - /node_modules/@mui/material/Checkbox/Checkbox.js
  - /node_modules/@mui/material/Chip/Chip.js
  - /node_modules/@mui/material/CircularProgress/CircularProgress.js
  - /node_modules/@mui/material/Container/Container.js
  - /node_modules/@mui/material/Dialog/Dialog.js
  - /node_modules/@mui/material/Drawer/Drawer.js
  - /node_modules/@mui/material/Fab/Fab.js
  - /node_modules/@mui/material/FormControl/FormControl.js
  - /node_modules/@mui/material/FormControlLabel/FormControlLabel.js
  - /node_modules/@mui/material/FormHelperText/FormHelperText.js
  - /node_modules/@mui/material/FormLabel/FormLabel.js
  - /node_modules/@mui/material/Icon/Icon.js
  - /node_modules/@mui/material/IconButton/IconButton.js
  - /node_modules/@mui/material/ImageListItemBar/ImageListItemBar.js
  - /node_modules/@mui/material/InputAdornment/InputAdornment.js
  - /node_modules/@mui/material/InputBase/InputBase.js
  - /node_modules/@mui/material/LinearProgress/LinearProgress.js
  - /node_modules/@mui/material/Link/Link.js
  - /node_modules/@mui/material/ListSubheader/ListSubheader.js
  - /node_modules/@mui/material/MobileStepper/MobileStepper.js
  - /node_modules/@mui/material/PaginationItem/PaginationItem.js
  - /node_modules/@mui/material/Radio/Radio.js
  - /node_modules/@mui/material/Slider/Slider.js
  - /node_modules/@mui/material/Snackbar/Snackbar.js
  - /node_modules/@mui/material/SpeedDial/SpeedDial.js
  - /node_modules/@mui/material/SpeedDialAction/SpeedDialAction.js
  - /node_modules/@mui/material/StepConnector/StepConnector.js
  - /node_modules/@mui/material/SvgIcon/SvgIcon.js
  - /node_modules/@mui/material/Switch/Switch.js
  - /node_modules/@mui/material/Tab/Tab.js
  - /node_modules/@mui/material/TableCell/TableCell.js
  - /node_modules/@mui/material/TableSortLabel/TableSortLabel.js
  - /node_modules/@mui/material/ToggleButton/ToggleButton.js
  - /node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js
  - /node_modules/@mui/material/Tooltip/Tooltip.js
  - /node_modules/@mui/material/Typography/Typography.js
  - /node_modules/@mui/material/internal/SwitchBase.js
  - /node_modules/@mui/material/Hidden/HiddenCss.js
  - /node_modules/@mui/material/NativeSelect/NativeSelectInput.js
  - /node_modules/@mui/material/Select/SelectInput.js
  - /node_modules/@mui/material/SwipeableDrawer/SwipeArea.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/createChainedFunction.js
bundle space:    0 %
rendered size:   0 Byte
original size:   123 Bytes
code reduction:  100 %
dependents:      1
  - /node_modules/@mui/material/Radio/Radio.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/debounce.js
bundle space:    0 %
rendered size:   0 Byte
original size:   84 Bytes
code reduction:  100 %
dependents:      4
  - /node_modules/@mui/material/Popover/Popover.js
  - /node_modules/@mui/material/Slide/Slide.js
  - /node_modules/@mui/material/Tabs/Tabs.js
  - /node_modules/@mui/material/Tabs/ScrollbarSize.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/isMuiElement.js
bundle space:    0 %
rendered size:   0 Byte
original size:   96 Bytes
code reduction:  100 %
dependents:      5
  - /node_modules/@mui/material/FormControl/FormControl.js
  - /node_modules/@mui/material/ImageListItem/ImageListItem.js
  - /node_modules/@mui/material/ListItem/ListItem.js
  - /node_modules/@mui/material/SpeedDial/SpeedDial.js
  - /node_modules/@mui/material/StepButton/StepButton.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/ownerDocument.js
bundle space:    0 %
rendered size:   0 Byte
original size:   99 Bytes
code reduction:  100 %
dependents:      5
  - /node_modules/@mui/material/MenuList/MenuList.js
  - /node_modules/@mui/material/Popover/Popover.js
  - /node_modules/@mui/material/SwipeableDrawer/SwipeableDrawer.js
  - /node_modules/@mui/material/Tabs/Tabs.js
  - /node_modules/@mui/material/Select/SelectInput.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/ownerWindow.js
bundle space:    0 %
rendered size:   0 Byte
original size:   93 Bytes
code reduction:  100 %
dependents:      3
  - /node_modules/@mui/material/Popover/Popover.js
  - /node_modules/@mui/material/SwipeableDrawer/SwipeableDrawer.js
  - /node_modules/@mui/material/Tabs/Tabs.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/requirePropFactory.js
bundle space:    0 %
rendered size:   0 Byte
original size:   114 Bytes
code reduction:  100 %
dependents:      1
  - /node_modules/@mui/material/Grid/Grid.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/useEnhancedEffect.js
bundle space:    0 %
rendered size:   0 Byte
original size:   111 Bytes
code reduction:  100 %
dependents:      8
  - /node_modules/@mui/material/InputBase/InputBase.js
  - /node_modules/@mui/material/ListItem/ListItem.js
  - /node_modules/@mui/material/ListItemButton/ListItemButton.js
  - /node_modules/@mui/material/MenuItem/MenuItem.js
  - /node_modules/@mui/material/MenuList/MenuList.js
  - /node_modules/@mui/material/SwipeableDrawer/SwipeableDrawer.js
  - /node_modules/@mui/material/useMediaQuery/useMediaQuery.js
  - /node_modules/@mui/material/Hidden/withWidth.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/useId.js
bundle space:    0 %
rendered size:   0 Byte
original size:   75 Bytes
code reduction:  100 %
dependents:      3
  - /node_modules/@mui/material/RadioGroup/RadioGroup.js
  - /node_modules/@mui/material/TablePagination/TablePagination.js
  - /node_modules/@mui/material/Tooltip/Tooltip.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/unsupportedProp.js
bundle space:    0 %
rendered size:   0 Byte
original size:   105 Bytes
code reduction:  100 %
dependents:      3
  - /node_modules/@mui/material/BottomNavigationAction/BottomNavigationAction.js
  - /node_modules/@mui/material/Chip/Chip.js
  - /node_modules/@mui/material/Tab/Tab.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/useControlled.js
bundle space:    0 %
rendered size:   0 Byte
original size:   99 Bytes
code reduction:  100 %
dependents:      6
  - /node_modules/@mui/material/Accordion/Accordion.js
  - /node_modules/@mui/material/RadioGroup/RadioGroup.js
  - /node_modules/@mui/material/SpeedDial/SpeedDial.js
  - /node_modules/@mui/material/Tooltip/Tooltip.js
  - /node_modules/@mui/material/internal/SwitchBase.js
  - /node_modules/@mui/material/Select/SelectInput.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/useEventCallback.js
bundle space:    0 %
rendered size:   0 Byte
original size:   108 Bytes
code reduction:  100 %
dependents:      5
  - /node_modules/@mui/material/ButtonBase/ButtonBase.js
  - /node_modules/@mui/material/Snackbar/Snackbar.js
  - /node_modules/@mui/material/SwipeableDrawer/SwipeableDrawer.js
  - /node_modules/@mui/material/Tabs/Tabs.js
  - /node_modules/@mui/material/Tooltip/Tooltip.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/useForkRef.js
bundle space:    0 %
rendered size:   0 Byte
original size:   90 Bytes
code reduction:  100 %
dependents:      18
  - /node_modules/@mui/material/ButtonBase/ButtonBase.js
  - /node_modules/@mui/material/Chip/Chip.js
  - /node_modules/@mui/material/Fade/Fade.js
  - /node_modules/@mui/material/Grow/Grow.js
  - /node_modules/@mui/material/InputBase/InputBase.js
  - /node_modules/@mui/material/Link/Link.js
  - /node_modules/@mui/material/ListItem/ListItem.js
  - /node_modules/@mui/material/ListItemButton/ListItemButton.js
  - /node_modules/@mui/material/MenuItem/MenuItem.js
  - /node_modules/@mui/material/MenuList/MenuList.js
  - /node_modules/@mui/material/Popover/Popover.js
  - /node_modules/@mui/material/RadioGroup/RadioGroup.js
  - /node_modules/@mui/material/Select/Select.js
  - /node_modules/@mui/material/Slide/Slide.js
  - /node_modules/@mui/material/SpeedDial/SpeedDial.js
  - /node_modules/@mui/material/Tooltip/Tooltip.js
  - /node_modules/@mui/material/Zoom/Zoom.js
  - /node_modules/@mui/material/Select/SelectInput.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/useIsFocusVisible.js
bundle space:    0 %
rendered size:   0 Byte
original size:   111 Bytes
code reduction:  100 %
dependents:      3
  - /node_modules/@mui/material/ButtonBase/ButtonBase.js
  - /node_modules/@mui/material/Link/Link.js
  - /node_modules/@mui/material/Tooltip/Tooltip.js

░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
file:            /node_modules/@mui/material/utils/getScrollbarSize.js
bundle space:    0 %
rendered size:   0 Byte
original size:   108 Bytes
code reduction:  100 %
dependents:      1
  - /node_modules/@mui/material/MenuList/MenuList.js


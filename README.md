[![<remarkable-notebooks-to-pdf>](https://circleci.com/gh/antonyoneill/remarkable-notebooks-to-pdf.svg?style=svg)](https://app.circleci.com/pipelines/github/antonyoneill/remarkable-notebooks-to-pdf)

# Remarkable Notebook to PDF

This tool exists purely as a learning exercise & productivity workflow enhancement.

Your milage with this library may vary.

## Usage

Ensure that the `rM2svg` binary is on your path. You can get it from https://github.com/reHackable/maxio.

```bash
npm --global install remarkable-notebooks-to-pdf

npx remarkable-notebooks-to-pdf -i <PATH_TO_NOTEBOOKS> -t <PATH_TO_TEMPLATES> -o <PATH_TO_OUTPUT>
```

### PDF Encryption

This is configured to AES encrypt the PDF output with a password if specified.

```bash
npx remarkable-notebooks-to-pdf -i <PATH_TO_NOTEBOOKS> -t <PATH_TO_TEMPLATES> -o <PATH_TO_OUTPUT> --pdfPassword 'Sensitive=SomePassword' --pdfPassword 'Other - Sensitive=AnotherPassword'
```

## Development

_TBC_

## Building

_TBC_

## Contributing

PRs are welcome, bugs may be raised as GitHub issues.

## License

[MIT](./LICENSE)

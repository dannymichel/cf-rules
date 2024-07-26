# Cloudflare Rules Manager (cf-rules)

Cloudflare Rules Manager (`cf-rules`) is a Node.js command-line tool for managing Cloudflare page rules. This tool allows you to create, list, disable, and delete page rules for your Cloudflare-managed domains.

## Features

- **Create Bypass Rule**: Create a cache bypass rule with options to disable apps and performance.
- **List Rules**: List all page rules for a specified domain.
- **Disable All Rules**: Disable all page rules for a specified domain.
- **Disable Specific Rule**: Disable a specific page rule by rule ID.
- **Delete Specific Rule**: Delete a specific page rule by rule ID.

## Prerequisites

- Node.js (>= 12.x)
- npm (>= 6.x)
- A Cloudflare account with API access
- jq (for JSON processing)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/dannymichel/cf-rules.git
cd cf-rules
```

2. Install dependencies:

```sh
npm install
```

3. Copy the example config file and edit it with your Cloudflare credentials:

```sh
cp config/config.example.json config/config.json
nano config/config.json
```

## Usage

### Create a Bypass Rule

To create a cache bypass rule:

```sh
node src/index.js create example.com/*
```

### List All Rules

To list all page rules for a domain:

```sh
node src/index.js list example.com
```

### Disable All Rules

To disable all page rules for a domain:

```sh
node src/index.js turnoffall example.com
```

### Disable a Specific Rule

To disable a specific page rule by rule ID:

```sh
node src/index.js turnoff example.com rule_id
```

### Delete a Specific Rule

To delete a specific page rule by rule ID:

```sh
node src/index.js delete example.com rule_id
```

## Configuration

Update the `config/config.json` file with your Cloudflare email and global API key:

```json
{
  "CF_AUTH_EMAIL": "your-email@example.com",
  "CF_AUTH_KEY": "your_global_api_key"
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request
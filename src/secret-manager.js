'use strict';
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const SENDGRID_API_KEY_SECRET_NAME = process.env.SENDGRID_API_KEY_SECRET_NAME ?? 'projects/149493619941/secrets/sendgrid-api-key/versions/latest';

class SecretManager {

  constructor() {
    this.instance = new SecretManagerServiceClient();
  }

  async getSecretValue(name) {
    try {
      const accessResponse = await this.instance.accessSecretVersion({ name });
      return accessResponse[0].payload.data.toString('utf8');
    } catch (e) {
      console.log('Error while retrieving secret from SecretManager', e);
    }
  }

  async getSendgridApiKey() {
    if (!this.sendgridApiKey) {
      this.sendgridApiKey = await this.getSecretValue(SENDGRID_API_KEY_SECRET_NAME);
    }
    return this.sendgridApiKey;
  }
}


exports.SecretManager = new SecretManager();

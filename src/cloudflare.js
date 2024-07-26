const axios = require('axios');
const config = require('../config/config.json');

const CF_AUTH_EMAIL = config.CF_AUTH_EMAIL;
const CF_AUTH_KEY = config.CF_AUTH_KEY;

const getZoneId = async (domain) => {
    const response = await axios.get(`https://api.cloudflare.com/client/v4/zones?name=${domain}`, {
        headers: {
            'X-Auth-Email': CF_AUTH_EMAIL,
            'X-Auth-Key': CF_AUTH_KEY,
            'Content-Type': 'application/json'
        }
    });
    return response.data.result[0].id;
};

const createBypassRule = async (zoneId, pattern) => {
    const response = await axios.post(`https://api.cloudflare.com/client/v4/zones/${zoneId}/pagerules`, {
        targets: [{ target: "url", constraint: { operator: "matches", value: pattern } }],
        actions: [
            { id: "cache_level", value: "bypass" },
            { id: "disable_apps", value: "on" },
            { id: "disable_performance", value: "on" }
        ],
        priority: 1,
        status: "active"
    }, {
        headers: {
            'X-Auth-Email': CF_AUTH_EMAIL,
            'X-Auth-Key': CF_AUTH_KEY,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

const listRules = async (zoneId) => {
    const response = await axios.get(`https://api.cloudflare.com/client/v4/zones/${zoneId}/pagerules`, {
        headers: {
            'X-Auth-Email': CF_AUTH_EMAIL,
            'X-Auth-Key': CF_AUTH_KEY,
            'Content-Type': 'application/json'
        }
    });
    return response.data.result;
};

const updateRuleStatus = async (zoneId, ruleId, status) => {
    const response = await axios.patch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/pagerules/${ruleId}`, {
        status: status
    }, {
        headers: {
            'X-Auth-Email': CF_AUTH_EMAIL,
            'X-Auth-Key': CF_AUTH_KEY,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

const deleteRule = async (zoneId, ruleId) => {
    const response = await axios.delete(`https://api.cloudflare.com/client/v4/zones/${zoneId}/pagerules/${ruleId}`, {
        headers: {
            'X-Auth-Email': CF_AUTH_EMAIL,
            'X-Auth-Key': CF_AUTH_KEY,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

module.exports = {
    getZoneId,
    createBypassRule,
    listRules,
    updateRuleStatus,
    deleteRule
};


const { getZoneId, createBypassRule, listRules, updateRuleStatus, deleteRule } = require('./cloudflare');

const [command, domainPattern, ruleId] = process.argv.slice(2);

const run = async () => {
    const domain = domainPattern.split('/')[0];
    const zoneId = await getZoneId(domain);

    switch (command) {
        case 'create':
            const createResponse = await createBypassRule(zoneId, domainPattern);
            console.log('Create response:', createResponse);
            break;
        case 'list':
            const rules = await listRules(zoneId);
            rules.forEach(rule => console.log(rule.id, rule.targets[0].constraint.value, rule.status));
            break;
        case 'turnoffall':
            const allRules = await listRules(zoneId);
            for (const rule of allRules) {
                const turnOffResponse = await updateRuleStatus(zoneId, rule.id, 'disabled');
                console.log('Turned off rule:', rule.id, turnOffResponse);
            }
            break;
        case 'turnoff':
            const turnOffResponse = await updateRuleStatus(zoneId, ruleId, 'disabled');
            console.log('Turned off rule:', ruleId, turnOffResponse);
            break;
        case 'delete':
            const deleteResponse = await deleteRule(zoneId, ruleId);
            console.log('Deleted rule:', ruleId, deleteResponse);
            break;
        default:
            console.log('Usage: node src/index.js {create|list|turnoffall|turnoff|delete} <domain_pattern> [rule_id]');
            break;
    }
};

run();


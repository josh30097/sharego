// loop through all component folders in shared/common/components
function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

requireAll(require.context('./../jcr_root/apps/shared/common', true, /script.js/));

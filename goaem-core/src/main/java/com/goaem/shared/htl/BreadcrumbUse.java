package com.goaem.shared.htl;

import com.google.common.collect.Lists;

import java.util.ArrayList;
import java.util.List;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;

public class BreadcrumbUse extends WCMUsePojo {

    private static final String ROOT_PATH_OVERRIDE = "rootPathOverride";

    private List<Page> crumbs;

    @Override
    public void activate() throws Exception {
        String rootPath = getProperties().get(ROOT_PATH_OVERRIDE, "");
        if (rootPath.isEmpty()) {
            InheritanceValueMap inherited =
                new HierarchyNodeInheritanceValueMap(getCurrentPage().getContentResource());
            rootPath = inherited.getInherited("navigationRootPath", "");
        }
        if (!rootPath.isEmpty()) {
            crumbs = findBreadcrumbs(rootPath);
        }
    }

    private List<Page> findBreadcrumbs(String rootPath) {
        List<Page> ret = new ArrayList<>();
        Page currentPage = getCurrentPage();
        while (currentPage != null) {
            String hideInNav = currentPage.getProperties().get("hideInNav", "");
            if (!hideInNav.equals("true")) {
                ret.add(currentPage);
            }
            if (currentPage.getPath().equals(rootPath)) {
                break;
            }
            currentPage = currentPage.getParent();
        }
        ret = Lists.reverse(ret);
        return ret;
    }

    public List<Page> getCrumbs() {
        return crumbs;
    }

}

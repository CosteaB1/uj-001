package com.unifun.voice.endpoint;


import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.bind.JsonbBuilder;
import javax.persistence.EntityManager;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import com.unifun.voice.orm.MNOConfigList;

@Path("/MnoConfigPoint")
@ApplicationScoped
@Produces("application/json")


public class MnoConfigPoint {

	@Inject
	EntityManager em;
	
	@GET
	public String get(@QueryParam("mno_id") int id) {
		System.out.println("IdOnClick" + id);

		//return JsonbBuilder.create().toJson(em.createNamedQuery("MNOList.getAll", MNOList.class).getResultList());
		return JsonbBuilder.create().toJson(em.createQuery("Select m from MNOConfigList m WHERE m.mno_id = " + 1 ,MNOConfigList.class ).getResultList());

	}
	  
}

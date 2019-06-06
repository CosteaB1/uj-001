package com.unifun.voice.endpoint;



import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.bind.JsonbBuilder;
import javax.persistence.EntityManager;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import com.unifun.voice.orm.SimboxListDb;


@Path("/SimboxList")
@ApplicationScoped
@Produces("application/json")


public class SimBoxList {
	@Inject
	EntityManager em;
	
	@GET
	public String get() {
		return JsonbBuilder.create().toJson(em.createNamedQuery("SimboxListDb.getAll", SimboxListDb.class).getResultList());
	}

}
package com.unifun.voice.endpoint;



import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.bind.JsonbBuilder;
import javax.persistence.EntityManager;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import com.unifun.voice.orm.MNOList;



@Path("/MNO")
@ApplicationScoped
@Produces("application/json")


public class MnoListPoint {

	
		
	@Inject
	EntityManager em;
	
	@GET
	public String get(@QueryParam("simbox_id") int id) {
		System.out.println("testttttttt0" + id);

		//return JsonbBuilder.create().toJson(em.createNamedQuery("MNOList.getAll", MNOList.class).getResultList());
		return JsonbBuilder.create().toJson(em.createQuery("Select m from MNOList m WHERE m.simbox_id = " + id ,MNOList.class ).getResultList());

	}

}